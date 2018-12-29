const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const config = require('../../config/database');

mongoose.connect(config.database, err => {
  if (err)
    console.log('ERROR! ' + err);
  else
    console.log('connected to mongodb');
});

router.get('/', (req, res) => {
  res.send('From API route')
});

module.exports = router;
