const express = require('express');
const router = express.Router();

let queue = [];
let readyMatches = [];

function makeMatch() {
  setInterval(function() {
    queue.forEach(function (game) {
      if (game.players.length > 1) {
        game.players.sort(() => .5 - Math.random());
        readyMatches.unshift([game.players.shift(), game.players.shift()]);
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

  setTimeout(function () {
    gameIndex = queue.map(function(g) { return g.game; }).indexOf(req.body.game);
    var playerIndex = queue[gameIndex].players.indexOf(req.body.username);
    queue[gameIndex].players.splice(playerIndex, 1);
    return res.json('oops');
  }, 30000);

  setInterval(function() {
    for (var i = 0; i < readyMatches.length; i++) {
      if (readyMatches[i].includes(req.body.username)) {
        var opponent = (readyMatches[i][0] === req.body.username) ? readyMatches[i][1] : readyMatches[i][0];
        readyMatches.splice(i, 1);
        return res.send({game: req.body.game, opponent: opponent})
      }
    }
  }, 2000);
});


module.exports.router = router;
module.exports.makeMatch = makeMatch;
