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
  User.find({}, 'username totalGames totalWins avgRating isOnline', (err, users) => {
    if (err)
      console.error(err);
    else
      res.send(users);
  });
});

router.get('/online-only', (req, res) => {
  User.find({'isOnline': 'online'}, 'username', (err, users) => {
    if (err)
      console.error(err);
    else
      res.send(users);
  });
});

router.get('/check-online/:username', (req, res) => {
  User.find({username: req.params.username}, 'isOnline', (err, result) => {
    if (err)
      return console.error(err);
    if (result.length > 0)
      res.send(result[0].isOnline === 'online');
  })
});

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.isOnline = 'online';
  user.save((err, registeredUser) => {
    if (err)
      console.log(err);
    else {
      let payload = {subject: registeredUser._id};
      let token = jwt.sign(payload, config.secret);
      res.status(200).send({token: token, username: user.username});
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({username: userData.username}, (err, user) => {
    if (err)
      return console.error(err);

    if (!user || user.password !== userData.password)
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
    if (err)
      return console.error(err);

    user.isOnline = 'offline';
    user.save((err, updatedUser) => {
      if (err) console.error(err);
      else res.sendStatus(200);
    });
  });
});

router.get('/personal-settings/:username' , (req, res) => {
  User.findOne({username: req.params.username}, 'username isOnline name birthdate gender', (err, user) => {
    if (err)
      return console.error(err);

    res.json(user);
  })
});

router.post('/personal-settings' , (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err)
      return console.error(err);

    let newData = req.body.newData;
    if (newData.name)
      user.name = newData.name;
    if (newData.birthdate)
      user.birthdate = newData.birthdate;
    if (newData.gender)
      user.gender = newData.gender;

    user.save((err, updatedUser) => {
      if (err)
        console.log(err);
      else
        res.json(updatedUser);
    });
  })
});

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }];
  res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }];
  res.json(specialEvents);
});

module.exports = router;
