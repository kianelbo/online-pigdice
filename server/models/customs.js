const mongoose = require('mongoose');

const CustomSchema = mongoose.Schema({
  name: {type: String, required: true},
  totalPlayed: {type: Number, default: 0},
  nowPlaying: {type: Number, default: 0},
  creator: {type: String, required: true},
  createDate: {type: Date, default: Date.now},
  ratedTimes: {type: Number, default: 0},
  avgRating: {type: Number, default: 0},
  rules: {
    winScore: {type: Number, required: true},
    diceCount: {type: Number, required: true},
    limit: {type: Number, required: true},
    blackDices: [Number]
  },
  comments: [{
    commenter: {type: String, required: true},
    text: String,
    rating: Number
  }]
});

module.exports = mongoose.model('Custom', CustomSchema, 'customs');
