const express = require('express');
const router = express.Router();

const Friendship = require('../models/friendships');


router.post('/request', (req, res) => {
  let friendship = new Friendship(req.body);
  friendship.save((err, friendRequest) => {
    if (err) console.log(err);
    else res.status(200).send('friend request now pending');
  });
});

router.post('/confirm', (req, res) => {
  Friendship.findOne({toUser: req.body.toUser, fromUser: req.body.fromUser}, (err, friendship) => {
    if (err)
      return console.error(err);

    friendship.pending = false;
    friendship.save((err, confirmed) => {
      if (err) console.log(err);
      else res.status(200).send('friend request now confirmed');
    });
  })
});

router.post('/decline', (req, res) => {
  Friendship.removeOne({
    $or: [{toUser: req.body.toUser, fromUser: req.body.fromUser}, {
      toUser: req.body.toUser,
      fromUser: req.body.fromUser
    }]
  }, (err, result) => {
    if (err)
      console.error(err);
    res.send('not friend any longer');
  });
});

router.get('/pending/:username', (req, res) => {
  Friendship.find({toUser: req.params.username, pending: true}, 'fromUser', (err, users) => {
    if (err)
      return console.error(err);

    res.json(users);
  })
});

router.get('/list/:username', (req, res) => {
  let completeList = [];
  Friendship.find({toUser: req.params.username, pending: false}, 'fromUser', (err, users) => {
    if (err)
      return console.error(err);
    if (users.length > 0)
      users.forEach((u) => completeList.push(u.fromUser));
  });
  Friendship.find({fromUser: req.params.username, pending: false}, 'toUser', (err, users) => {
    if (err)
      return console.error(err);
    if (users.length > 0)
      users.forEach((u) => completeList.push(u.toUser));
    res.send(completeList);
  });
});

router.post('/check', (req, res) => {
  Friendship.countDocuments({
      $or: [{toUser: req.body.toUser, fromUser: req.body.fromUser}, {
        toUser: req.body.fromUser,
        fromUser: req.body.toUser
      }], pending: false
    },
    (err, count) => {
      if (err)
        console.error(err);
      res.send(count !== 0);
    });
});

module.exports = router;
