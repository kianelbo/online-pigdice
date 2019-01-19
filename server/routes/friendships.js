const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verify');

const Friendship = require('../models/friendships');


router.post('/request', verifyToken, (req, res) => {
  let friendship = new Friendship(req.body);
  friendship.save((err, friendRequest) => {
    if (err) console.log(err);
    else res.status(200).send('friend request now pending');
  });
});

router.post('/confirm', verifyToken, (req, res) => {
  Friendship.findOne({toUser: req.body.toUser, fromUser: req.body.fromUser}, (err, friendship) => {
    if (err)
      return console.error(err);

    console.log(friendship);
    friendship.pending = false;
    friendship.save((err, confirmed) => {
      if (err) console.log(err);
      else res.status(200).send('friend request now confirmed');
    });
  })
});

router.post('/unfriend', verifyToken, (req, res) => {
  Friendship.remove({
    $or: [{toUser: req.body.user1, fromUser: req.body.user2}, {toUser: req.body.user2, fromUser: req.body.user1}]},
    (err, result) => {
    if (err)
      console.error(err);
    res.send('not friend any longer');
  });
});

router.get('/pending/:username', verifyToken, (req, res) => {
  Friendship.find({toUser: req.params.username, pending: true}, 'fromUser', (err, users) => {
    if (err)
      return console.error(err);

    let completeList = [];
    if (users.length > 0)
      users.forEach((u) => completeList.push(u.fromUser));
    res.send(completeList);
  })
});

router.get('/list/:username', verifyToken, (req, res) => {
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

router.post('/check', verifyToken, (req, res) => {
  Friendship.findOne({
      $or: [{toUser: req.body.user1, fromUser: req.body.user2}, {toUser: req.body.user2, fromUser: req.body.user1}]
    }, (err, user) => {
      if (err)
        console.error(err);

      if (user)
        res.json(user.pending ? 'pending' : 'isFriend');
      else
        res.json('notFriend');
    });
});

module.exports = router;
