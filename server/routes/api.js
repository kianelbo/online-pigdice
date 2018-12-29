const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const config = require('../../config/database');

const User = require('../models/users');

mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err)
    console.error('ERROR! ' + err);
  else
    console.log('connected to mongodb');
});

router.get('/', (req, res) => {
  res.send('From API route')
});

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, registeredUser) => {
    if (err)
      console.log(err);
    else
      res.status(200).send(registeredUser);
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;

  User.findOne({username: userData.username}, (err, user) => {
    if (err)
      return console.error(err);

    if (!user || user.password !== userData.password)
      res.sendStatus(401);
    else
      res.status(200).send(user);
  });
});

module.exports = router;
