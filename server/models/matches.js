const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = Schema({
  game: String,
  date: {type: Date, default: Date.now},
  winnerName: String,
  loserName: String,
  result: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Match', MatchSchema, 'matches');
