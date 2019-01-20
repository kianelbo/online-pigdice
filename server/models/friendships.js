const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipSchema = Schema({
  fromUser: {type: Schema.Types.ObjectId, ref: 'User'},
  toUser: {type: Schema.Types.ObjectId, ref: 'User'},
  pending: {type: Boolean, default: true}
});

module.exports = mongoose.model('Friendship', FriendshipSchema, 'friendships');
