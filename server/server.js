const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const customsRoute = require('./routes/customs');
const friendshipsRoute = require('./routes/friendships');


const config = require('../config/configs');
mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err)
    console.error('ERROR! ' + err);
  else
    console.log('connected to mongodb');
});

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/customs', customsRoute);
app.use('/friendships', friendshipsRoute);


app.listen(PORT, function () {
  console.log('Server running on localhost: ' + PORT)
});
