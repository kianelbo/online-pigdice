const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users');
const customsRoute = require('./routes/customs');
const friendshipsRoute = require('./routes/friendships');
const commentsRoute = require('./routes/comments');
const matchRoute = require('./routes/matches');


const config = require('../config/backend');
mongoose.connect(config.database, {useNewUrlParser: true}, err => {
  if (err) console.error('ERROR! ' + err);
  else console.log('connected to database');
});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoute);
app.use('/customs', customsRoute);
app.use('/friendships', friendshipsRoute);
app.use('/comments', commentsRoute);

app.get('/', (req, res) => {
  res.send('invaild endpoint');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server = app.listen(PORT, function () {
  console.log('Server running on localhost:' + PORT);
});
matchRoute.initMatchOrganizer(server);
