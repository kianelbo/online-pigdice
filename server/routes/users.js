const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

const config = require('../../config/configs');

mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err)
    console.error('ERROR! ' + err);
  else
    console.log('connected to mongodb');
});

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

router.get('/', (req, res) => {
  res.send('From USERS route')
});

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, registeredUser) => {
    if (err)
      console.log(err);
    else {
      let payload = {subject: registeredUser._id};
      let token = jwt.sign(payload, config.secret);
      res.status(200).send({token});
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
      let payload = {subject: user._id};
      let token = jwt.sign(payload, config.secret);
      res.status(200).send({token: token, username: user.username});
    }
  });
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
