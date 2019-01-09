const express = require('express');
const router = express.Router();

const Custom = require('../models/customs');


router.post('/create', (req, res) => {
  let custom = new Custom(req.body);
  custom.save((err, createdCustom) => {
    if (err)
      console.error(err);
    else
      res.status(200).send(createdCustom);
  });
});

router.get('/all', (req, res) => {
  Custom.find({}, (err, games) => {
    if (err)
      console.error(err);
    else
      res.send(games);
  });
});

router.post('/start', (req, res) => {
  Custom.findOne({name: req.body.name}, (err, game) => {
    if (err)
      console.error(err);

    game.nowPlaying++;
    game.totalPlayed++;
    game.save((err, updatedGame) => {
      if (err)
        console.error(err);
      res.send(updatedGame.rules);
    });
  });
});

router.post('/finish', (req, res) => {
  Custom.findOne({name: req.body.name}, (err, game) => {
    if (err)
      console.error(err);

    game.nowPlaying--;
    game.save((err, updatedGame) => {
      if (err)
        console.error(err);
      res.sendStatus(200);
    });
  });
});

module.exports = router;
