const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  gender: {type: String, default: 'male'},
  birthdate: {type: Date, default: Date.now},
  email: {type: String, required: true,},
  username: {type: String, required: true,},
  password: {type: String, required: true,},
});

module.exports = mongoose.model('User', UserSchema, 'users');
