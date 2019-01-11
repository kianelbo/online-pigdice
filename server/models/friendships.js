const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = Schema({
  fromUser: String,
  toUser: String,
  pending: {type: Boolean, default: true}
});

module.exports = mongoose.model('Friendship', FriendshipSchema, 'friendships');
