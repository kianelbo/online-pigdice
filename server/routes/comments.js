const express = require('express');
const router = express.Router();

const Comment = require('../models/comments');
const Custom = require('../models/customs');
const User = require('../models/users');


router.get('/all/:category', (req, res) => {
  Comment.find({category: req.params.category}, (err, comments) => {
    if (err)
      console.error(err);
    else
      res.send(comments);
  });
});

router.post('/new/:category', (req, res) => {
  let comment = new Comment(req.body);
  comment.category = req.params.category;
  comment.save((err, newComment) => {
    if (err)
      console.error(err);
    else
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

router.post('/delete', (req, res) => {
  Comment.deleteOne({_id: req.body._id}, (err, result) => {
    if (err)
      console.error(err);
    res.send('comment removed');
  });
});

router.post('/confirm', (req, res) => {
  Comment.findOneAndDelete({_id: req.body._id}, (err, comment) => {
    if (err)
      console.error(err);

    if (comment.category === 'user') {
      User.findOne({username: comment.subject}, (req, user) => {
        delete comment.subject;
        delete comment.category;
        user.comments.push(comment);
        user.save((err, userWithNewComment) => {
          if (err) return console.error(err);
          res.send('comment confirmed');
        });
      })
    } else {
      Custom.findOne({name: comment.subject}, (req, game) => {
        delete comment.subject;
        delete comment.category;
        game.comments.push(comment);
        game.save((err, gameWithNewComment) => {
          if (err) return console.error(err);
          res.send('comment confirmed');
        });
      })
    }
  });
});

module.exports = router;
