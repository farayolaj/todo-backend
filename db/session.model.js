const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const session = {
  token: {
    type: String,
    required: 'Token must be present'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: 'There must be a userId'
  },
  timeCreated: {
    type: Date,
    default: Date.now
  }
};

const Session = mongoose.model('Session', session);

module.exports = Session;
