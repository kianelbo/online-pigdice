const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verify');

const Custom = require('../models/customs');
const User = require('../models/users');


router.post('/create', verifyToken, (req, res) => {
  let custom = new Custom(req.body);
  custom.save((err, createdCustom) => {
    if (err) return console.error(err);

    User.findOne({username: req.body.creator}, (err, user) => {
      user.createdGames.push(createdCustom);
      user.save((err, savedUser) => res.send(createdCustom));
    });
  });
});

router.get('/all', (req, res) => {
  Custom.find({}).populate('comments').exec(function (err, games) {
      if (err) return console.error(err);
      res.send(games);
  });
});

router.post('/start', (req, res) => {
  Custom.findOne({name: req.body.name}, '_id winScore diceCount limit blackDices nowPlaying totalPlayed', (err, game) => {
    if (err) return console.error(err);

    game.nowPlaying++;
    game.totalPlayed++;
    game.save((err, updatedGame) => {
      if (err) return console.error(err);
      res.send(updatedGame);
    });
  });
});

router.post('/finish', (req, res) => {
  Custom.findOne({name: req.body.name}, (err, game) => {
    if (err)
      console.error(err);

    game.nowPlaying -= 0.5;
    game.save((err, updatedGame) => {
      if (err)
        console.error(err);
      res.sendStatus(200);
    });
  });
});

module.exports = router;
