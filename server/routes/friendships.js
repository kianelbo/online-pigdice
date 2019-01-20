const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verify');

const Friendship = require('../models/friendships');


router.post('/request', verifyToken, (req, res) => {
  let friendship = new Friendship(req.body);
  friendship.save((err, friendRequest) => {
    if (err) console.log(err);
    else res.status(200).send(friendRequest);
  });
});

router.post('/confirm', verifyToken, (req, res) => {
  Friendship.findOne({toUser: req.body.toUser, fromUser: req.body.fromUser}, (err, friendship) => {
    if (err) return console.error(err);

    friendship.pending = false;
    friendship.save((err, confirmed) => {
      if (err) console.log(err);
      else res.status(200).send('friend request now confirmed');
    });
  })
});

router.post('/unfriend', verifyToken, (req, res) => {
  Friendship.deleteOne({
    $or: [{toUser: req.body.user1, fromUser: req.body.user2}, {toUser: req.body.user2, fromUser: req.body.user1}]},
    (err, result) => {
    if (err)
      console.error(err);
    res.send('not friend any longer');
  });
});

router.get('/pending/:userId', verifyToken, (req, res) => {
  Friendship.find({toUser: req.params.userId, pending: true}).populate('fromUser').exec((err, users) => {
    if (err) return console.error(err);
    let list = [];
    if (users.length > 0)
      users.forEach((u) => list.push({
        username: u.fromUser.username,
        isOnline: u.fromUser.isOnline,
        picture: u.fromUser.picture,
        _id: u.fromUser._id,
        pending: true
      }));
    res.send(list);
  });
});

router.get('/list/:userId', verifyToken, async (req, res) => {
  let list = [];
  var promise = new Promise((resolve, reject) => {
    Friendship.find({toUser: req.params.userId, pending: false}).populate('fromUser').exec((err, users1) => {
      if (err) return console.error(err);
      if (users1.length > 0)
        users1.forEach((u) => list.push({
          username: u.fromUser.username,
          isOnline: u.fromUser.isOnline,
          picture: u.fromUser.picture,
          _id: u.fromUser._id,
          pending: false
        }));
      resolve(list);
    });
  });

  list = await promise;
  Friendship.find({fromUser: req.params.userId, pending: false}).populate('toUser').exec((err, users2) => {
    if (err) return console.error(err);
    if (users2.length > 0)
      users2.forEach((u) => list.push({
        username: u.toUser.username,
        isOnline: u.toUser.isOnline,
        picture: u.toUser.picture,
        _id: u.toUser._id,
        pending: false
      }));
    res.send(list);
  });
});

router.post('/check', verifyToken, (req, res) => {
  Friendship.findOne({$or: [{toUser: req.body.user1, fromUser: req.body.user2}, {toUser: req.body.user2, fromUser: req.body.user1}]}).
  exec((err, result) => {
    if (err) return console.error(err);

    if (result)
      res.json(result.pending ? 'pending' : 'isFriend');
    else
      res.json('notFriend');
  });
});

module.exports = router;
