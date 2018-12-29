const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello');
});


app.listen(PORT, function () {
  console.log('Server running on localhost: ' + PORT)
});
