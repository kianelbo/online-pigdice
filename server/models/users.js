const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  gender: {type: String, default: 'male'},
  birthdate: {type: Date, default: Date.now},
  email: {type: String, required: true,},
  username: {type: String, required: true,},
  password: {type: String, required: true,},
  isOnline: {type: String, default: 'online'},
  totalGames: {type: Number, default: 0},
  totalWins: {type: Number, default: 0},
  ratedTimes: {type: Number, default: 0},
  avgRating: {type: Number, default: 0},
  comments: [{
    commenter: String,
    text: String,
    rating: Number
  }],
  matches: [{
    opponent: String,
    game: String,
    result: String,
    hasWon: Boolean
  }]
});

module.exports = mongoose.model('User', UserSchema, 'users');
