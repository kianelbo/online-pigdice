const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRoute = require('./routes/users');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.get('/', function (req, res) {
  res.send('Hello');
});


app.listen(PORT, function () {
  console.log('Server running on localhost: ' + PORT)
});
