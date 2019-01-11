const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: String,
  gender: {type: String, default: 'male'},
  birthDate: {type: Date, default: Date.now},
  isOnline: {type: String, default: 'online'},
  totalGames: {type: Number, default: 0},
  totalWins: {type: Number, default: 0},
  ratedTimes: {type: Number, default: 0},
  avgRating: {type: Number, default: 0},
  createdGames: [{type: Schema.Types.ObjectId, ref: 'Custom'}],
  matches: [{type: Schema.Types.ObjectId, ref: 'Match'}]
});

module.exports = mongoose.model('User', UserSchema, 'users');
