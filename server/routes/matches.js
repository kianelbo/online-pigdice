const Match = require('../models/matches');
const User = require('../models/users');

const socketIO = require('socket.io');

function initMatchOrganizer(server) {
  let queue = [];
  let foundMatches = [];
  const io = socketIO.listen(server);
  io.sockets.on('connection', (socket) => {
    // enqueuing scenario
    socket.on('enqueue', (data) => {
      var gameIndex = queue.map(function(q) { return q.game; }).indexOf(data.game);
      if (gameIndex > -1)
        queue[gameIndex].players.push({username: data.username, socket: socket});
      else
        gameIndex = queue.push({game: data.game, players: [{username: data.username, socket: socket}]}) - 1;

      if (queue[gameIndex].players.length > 1) {
        var player1 = queue[gameIndex].players.shift();
        var player2 = queue[gameIndex].players.shift();
        var room = player1.username + ' ' + player2.username + ' ' + data.game;
        var toConfirmData = {player1: player1.username, player2: player2.username, game: data.game, room: room};
        player1.socket.join(room);
        player2.socket.join(room);
        foundMatches.unshift({room: room, checks: 0});
        io.in(room).emit('foundOpponent', toConfirmData);
      }
    });
    socket.on('dequeue', (data) => {
      var gameIndex = queue.map(function(q) { return q.game; }).indexOf(data.game);
      var qIndex = queue[gameIndex].players.map(function(p) { return p.username; }).indexOf(data.username);
      queue[gameIndex].players.splice(qIndex, 1);
      return socket.emit('notFound', data);
    });
    // requesting scenario
    socket.on('requestSent', (data) => {
      socket.broadcast.emit('challenged', data);
      socket.join(data.room);
      foundMatches.unshift({room: data.room, checks: 1});
    });
    socket.on('requestReceived', (data) => {
      socket.join(data.room);
    });
    // confirming stage
    socket.on('accept', (data) => {
      var matchIndex = foundMatches.map(function(m) { return m.room; }).indexOf(data.room);
      foundMatches[matchIndex].checks++;

      if (foundMatches[matchIndex].checks === 2) {  // both users accept the match
        let match = new Match({game: data.game});
        match.save((err, savedMatch) => {
          data['matchId'] = savedMatch._id;
          io.in(data.room).emit('starting', data);
          io.in(data.room).clients((err, socketIDs) => {
            if (err) throw err;
            socketIDs.forEach(s => io.sockets.sockets[s].leave(data.room));
          });
        });
        foundMatches.splice(matchIndex, 1);
      }
    });
    socket.on('decline', (data) => {
      var matchIndex = foundMatches.map(function(m) { return m.room; }).indexOf(data.room);
      io.in(data.room).emit('canceled', data);
      foundMatches.splice(matchIndex, 1);

      io.in(data.room).clients((err, socketIDs) => {
        if (err) throw err;
        socketIDs.forEach(s => io.sockets.sockets[s].leave(data.room));
      });
    });

    // in game events
    socket.on('started', (data) => {
      socket.join(data.room);
    });
    socket.on('roll', (data) => {
      var diceArray = Array.from({length: data.n}, () => Math.floor(Math.random() * 6) + 1);
      io.in(data.room).emit('receiveDices', {diceArray: diceArray});
    });
    socket.on('hold', (data) => {
      io.in(data.room).emit('changeTurns');
    });
    socket.on('finished', (data) => {
      Match.findOne({_id: data.matchId}, (err, match) => {
        if (err) return console.error(err);

        match.result = data.result;
        var username;
        if (data.winnerName) {
          match.winnerName = data.winnerName;
          username = data.winnerName;
          var winFlag = true;
        }
        if (data.loserName) {
          match.loserName = data.loserName;
          username = data.loserName;
        }
        match.save((err, savedMatch) => {
          if (err) return console.error(err);
          if (!username.startsWith('guest'))
            User.findOne({username: username}, (err, user) => {
              user.totalGames++;
              if (winFlag) user.totalWins++;
              user.matches.unshift(savedMatch);
              user.save((err, savedUser) => {
                if (err) console.error(err);
              })
            });
        });
      });
      socket.leave(data.room);
    });
  })
}

module.exports.initMatchOrganizer = initMatchOrganizer;
