const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const action = {
  task: {
    type: String,
    required: 'What task should we help ypu note?',
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: 'Who owns the task?',
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
};

const Action = mongoose.model('Action', action);

module.exports = Action;
