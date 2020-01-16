const mongoose = require('mongoose');
const crypto = require('crypto');
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
    required: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  passwordHash: {
    type: String
  },
  salt: String
});

userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encrypt(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.path('passwordHash')
  .validate(function(p) {
    if (this._password && this._password.length < 6)
      this.invalidate('password', 'Password must not contain less than 6 characters');
    if (this.isNew && !this._password)
      this.invalidate('password', 'Password required');
  })

userSchema.methods = {
  makeSalt: function() {
    return Date.now().valueOf() + Math.random() + '';
  },
  encrypt: function(password) {
    return crypto.createHmac('md5', this.salt)
      .update(password)
      .digest('hex');
  },
  authenticate: function(password) {
    return this.passwordHash === this.encrypt(password);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
