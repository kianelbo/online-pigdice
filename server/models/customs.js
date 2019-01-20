const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomSchema = Schema({
  name: {type: String, required: true},
  totalPlayed: {type: Number, default: 0},
  nowPlaying: {type: Number, default: 0},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  createDate: {type: Date, default: Date.now},
  ratedTimes: {type: Number, default: 0},
  avgRating: {type: Number, default: 0},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],

  winScore: {type: Number, required: true},
  diceCount: {type: Number, required: true},
  limit: {type: Number, required: true},
  blackDices: [Number]
});

module.exports = mongoose.model('Custom', CustomSchema, 'customs');
