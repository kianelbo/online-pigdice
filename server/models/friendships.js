const mongoose = require('mongoose');

const FriendshipSchema = mongoose.Schema({
  fromUser: String,
  toUser: String,
  pending: {type: Boolean, default: true}
});

module.exports = mongoose.model('Friendship', FriendshipSchema, 'friendships');
