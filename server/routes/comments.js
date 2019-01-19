const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verify');

const Comment = require('../models/comments');
const Custom = require('../models/customs');
const Match = require('../models/matches');
const User = require('../models/users');


router.get('/unconfirmed-list/:category', verifyToken, (req, res) => {
  Comment.find({category: req.params.category, confirmed: false}, (err, comments) => {
    if (err) return console.error(err);
    res.send(comments);
  });
});

router.post('/new', (req, res) => {
  let comment = new Comment(req.body);
  comment.save((err, newComment) => {
    if (err) return console.error(err);
    res.status(200).send(newComment);
  });
});

router.post('/rate/:category', (req, res) => {
  if (req.params.category === 'user') {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return console.error(err);

      user.avgRating = (parseInt(user.avgRating * user.ratedTimes) + parseInt(req.body.rating)) / (user.ratedTimes + 1);
      user.ratedTimes += 1;
      user.save((err, ratedUser) => {
        if (err) return console.error(err);
        res.send(ratedUser);
      });
    })
  } else {
    Custom.findOne({name: req.body.name}, (err, game) => {
      if (err) return console.error(err);

      game.avgRating = (parseInt(game.avgRating * game.ratedTimes) + parseInt(req.body.rating)) / (game.ratedTimes + 1);
      game.ratedTimes += 1;
      game.save((err, ratedGame) => {
        if (err) return console.error(err);
        res.send(ratedGame);
      });
    })
  }
});

router.post('/delete', verifyToken, (req, res) => {
  Comment.deleteOne({_id: req.body._id}, (err, result) => {
    if (err) return console.error(err);
    res.send('comment removed');
  });
});

router.post('/confirm', verifyToken, (req, res) => {
  Comment.findOne({_id: req.body._id}, (err, comment) => {
    if (err) console.error(err);

    comment.confirmed = true;
    comment.save((err, confirmedComment) => {
      Match.findOne({_id: confirmedComment.match}, (req, match) => {
        match.comments.push(confirmedComment);
        match.save((err, result) => {
          if (err) console.error(err)
        });
      });
      if (confirmedComment.category === 'game')
        Custom.findOne({_id: confirmedComment.game}, (req, custom) => {
          custom.comments.push(confirmedComment);
          custom.save((err, result) => {
            if (err) console.error(err);
            res.send('comment confirmed');
          });
        });
    });
  });
});

module.exports = router;
