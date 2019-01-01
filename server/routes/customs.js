const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Custom = require('../models/customs');

const config = require('../../config/configs');

mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err)
    console.error('ERROR! ' + err);
  else
    console.log('connected to mongodb');
});


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
      res.json(games);
  })
});

router.post('/add-comment', (req, res) => {
  Custom.findOne({name: req.body.name}, (err, game) => {
    if (err)
      return console.error(err);

    if (req.body.comment.rating) {
      game.avgRating = (game.avgRating * game.ratedTimes + req.body.comment.rating) / (game.ratedTimes + 1);
      game.ratedTimes += 1;
    }
    game.comments.push(req.body.comment);
    game.save((err, commentedGame) => {
      if (err) return console.error(err);
      res.send(commentedGame);
    });
  })
});

module.exports = router;
