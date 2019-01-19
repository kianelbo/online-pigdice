const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const customsRoute = require('./routes/customs');
const friendshipsRoute = require('./routes/friendships');
const commentsRoute = require('./routes/comments');
const matchRoute = require('./routes/matches');


const config = require('../config/backend');
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
app.use('/comments', commentsRoute);


server = app.listen(PORT, function () {
  console.log('Server running on localhost: ' + PORT);
});
matchRoute.initMatchOrganizer(server);
