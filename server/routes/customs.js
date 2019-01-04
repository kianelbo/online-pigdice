const express = require('express');
const router = express.Router();

const Custom = require('../models/customs');


router.post('/create', (req, res) => {
  let custom = new Custom(req.body);
  custom.save((err, createdCustom) => {
    if (err)
      console.error(err);
    else
      res.status(200).send(createdCustom);
  });
});

router.get('/all', (req, res) => {
  Custom.find({}, (err, games) => {
    if (err)
      console.error(err);
    else
      res.send(games);
  })
});

module.exports = router;
