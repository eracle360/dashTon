const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
