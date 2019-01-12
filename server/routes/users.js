const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../../config/configs');

const User = require('../models/users');


function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.sendStatus(401);

  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null')
    return res.sendStatus(401);

  let payload = jwt.verify(token, config.secret);
  if (!payload)
    return res.sendStatus(401);

  req.userId = payload.subject;
  next();
}

router.get('/all', (req, res) => {
  User.find({username: {$ne: 'admin'}}).populate('createdGames').select('username totalGames totalWins avgRating isOnline createdGames').
  exec(function (err, users) {
      if (err) return console.error(err);
      res.send(users);
  });
});

router.get('/online-only', (req, res) => {
  User.find({'isOnline': 'online', username: {$ne: 'admin'}}, 'username', (err, users) => {
    if (err) console.error(err);
    else res.send(users);
  });
});

router.get('/check-online/:username', (req, res) => {
  User.find({username: req.params.username}, 'isOnline', (err, result) => {
    if (err) return console.error(err);
    if (result.length > 0)
      res.send(result[0].isOnline === 'online');
  })
});

// router.get('/exists/:username', (req, res) => {
//   User.find({username: req.params.username}, (err, result) => {
//     if (err)
//       return console.error(err);
//     if (result.length > 0)
//       res.json(true);
//   })
// });

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.isOnline = 'online';
  user.save((err, registeredUser) => {
    if (err) return console.log(err);

    let payload = {subject: registeredUser._id};
    let token = jwt.sign(payload, config.secret);
    res.status(200).send({token: token, username: user.username});
  });
});

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) return console.error(err);

    if (!user || user.password !== req.body.password)
      res.sendStatus(401);
    else {
      user.isOnline = 'online';
      user.save((err, updatedUser) => {
        if (err) console.error(err);
      });
      let payload = {subject: user._id};
      let token = jwt.sign(payload, config.secret);
      res.status(200).send({token: token, username: user.username});
    }
  });
});

router.post('/logout', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) return console.error(err);

    user.isOnline = 'offline';
    user.save((err, updatedUser) => {
      if (err) console.error(err);
      else res.sendStatus(200);
    });
  });
});

router.get('/personal-settings/:username' , (req, res) => {
  User.findOne({username: req.params.username}, 'username isOnline name birthDate gender email', (err, user) => {
    if (err) return console.error(err);
    res.send(user);
  })
});

router.get('/play-stats/:username' , (req, res) => {
  User.findOne({username: req.params.username}).populate('Match').select('username totalGames totalWins avgRating matches').
  exec(function (err, user) {
    if (err) return console.error(err);
    res.send(user);
  });
});

router.post('/personal-settings' , (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) return console.error(err);

    let newData = req.body.newData;
    if (newData.name)
      user.name = newData.name;
    if (newData.birthDate)
      user.birthDate = newData.birthDate;
    if (newData.gender)
      user.gender = newData.gender;
    if (newData.email)
      user.email = newData.email;

    user.save((err, updatedUser) => {
      if (err) return console.log(err);
      res.json(updatedUser);
    });
  })
});

module.exports = router;
