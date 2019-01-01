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

router.get('/', (req, res) => {
  res.send('From CUSTOMS route')
});

router.post('/create', (req, res) => {
  let custom = new Custom(req.body);
  custom.save((err, createdCustom) => {
    if (err)
      console.log(err);
    else
      res.status(200).send(createdCustom);
  });
});

module.exports = router;
