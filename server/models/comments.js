const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  category: String,
  confirmed: {type: Boolean, default: false},
  commenter: String,
  text: String,
  rating: Number,
  game: {type: Schema.Types.ObjectId, ref: 'Custom'},
  match: {type: Schema.Types.ObjectId, ref: 'Match'}
});

module.exports = mongoose.model('Comment', CommentSchema, 'comments');
