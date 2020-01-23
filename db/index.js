const mongoose = require('mongoose');
const User = require('./user.model');
const Session = require('./session.model');
const Action = require('./action.model');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/todo', options)
  .catch(error => console.error(error));

mongoose.connection.on('connect', () => console.log('Connected to database'));

mongoose.connection.on('error', error => console.error(error));

module.exports = { User, Session, Action };
