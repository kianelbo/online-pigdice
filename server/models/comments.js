const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  category: String,
  subject: String,
  commenter: String,
  text: String,
  rating: Number
});

module.exports = mongoose.model('Comment', CommentSchema, 'comments');
