const express = require('express');
const router = express.Router();

let queue = [];
let foundMatches = [];
let readyMatches = [];

function makeMatch() {
  setInterval(function() {
    queue.forEach(function (game) {
      if (game.players.length > 1) {
        game.players.sort(() => .5 - Math.random());
        foundMatches.unshift([game.players.shift(), game.players.shift(), 2]);
      }
    })
  }, 1000);
}

router.post('/enqueue', (req, res) => {
  var gameIndex = queue.map(function(q) { return q.game; }).indexOf(req.body.game);
  if (gameIndex > -1)
    queue[gameIndex].players.push(req.body.username);
  else
    queue.push({game: req.body.game, players: [req.body.username]});

  var failureTimer = setTimeout(function () {
    gameIndex = queue.map(function(g) { return g.game; }).indexOf(req.body.game);
    var playerIndex = queue[gameIndex].players.indexOf(req.body.username);
    queue[gameIndex].players.splice(playerIndex, 1);
    clearInterval(searchInterval);
    return res.json('oops');
  }, 10000);

  var searchInterval = setInterval(function() {
    for (var i = 0; i < foundMatches.length; i++) {
      if (foundMatches[i].includes(req.body.username)) {
        var opponent = (foundMatches[i][0] === req.body.username) ? foundMatches[i][1] : foundMatches[i][0];
        foundMatches[i][2]--;
        if (foundMatches[i][2] === 0) {
          foundMatches[i].push(req.body.game);
          readyMatches.unshift(foundMatches[i]);
          foundMatches.splice(i, 1);
        }
        clearTimeout(failureTimer);
        clearInterval(searchInterval);
        return res.send({game: req.body.game, opponent: opponent})
      }
    }
  }, 2000);
});

router.post('/accept', (req, res) => {
  var index;
  for (var i = 0; i < readyMatches.length; i++)
    if (readyMatches[i].includes(req.body.username)) index = i;

  readyMatches[index][2]++;

  var declineTimer = setTimeout(function () {
    readyMatches.splice(index, 1);
    return res.send('declined');
  }, 30000);

  while (readyMatches[index][2] !== 2 || readyMatches[index][2] < 0);
  if (readyMatches[index][2] === 2) {
    res.send('accepted');
  }
  if (readyMatches[index][2] < 0) {
    res.send('declined');
  }
  clearTimeout(declineTimer);
  readyMatches.splice(index, 1);
});

router.post('/decline', (req, res) => {
  var index;
  for (var i = 0; i < readyMatches.length; i++)
    if (readyMatches[i].includes(req.body.username)) index = i;

  readyMatches[index][2] -= 99;


});


module.exports.router = router;
module.exports.makeMatch = makeMatch;
