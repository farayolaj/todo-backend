const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: 'First name required',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Last name required',
    trim: true
  },
  email: {
    type: String,
    required: 'E-mail required',
    match: [/.+\@.+\..+/, 'Enter valid E-mail'],
    trim: true,
    unique: 'E-mail exists already'
  },
  dob: {
    type: Date,
    //required: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.path('password')
  .validate(function(password) {
    if (password && password.length < 6)
      this.invalidate('password', 'Password must not contain less than 6 characters');
    if (this.isNew && !password)
      this.invalidate('password', 'Password required');
  });

const User = mongoose.model('User', userSchema);

User.plugIn(passportLocalMongoose);

module.exports = User;
