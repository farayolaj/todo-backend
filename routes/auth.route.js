const express = require('express');

const router = express.Router();
const { User, Session } = require('./../db');

router.route('/login').
  post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }, (error, user) => {
      console.log(email, password, user);
      if (!user) res.json({ error: 'user not found' });
      else if (user && user.authenticate(password)) {
        const token = 'abcd';
        const payload = { token, userId: user.id };
        new Session({payload}).save();
        res.json(payload);
      } else {
        res.json({ error: 'authentication failed' });
      }
    });
  });

router.route('/logout').
  get((req, res) => {
    const token = req.headers.token;
    Session.deleteOne({ token }, (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        res.json({ error: 'Error on logout' });
      } else if (result && result.deletedCount == 1) {
        console.log('Session deleted');
        res.json({ message: 'Logged out', success: true });
      } else {
        res.json({ error: 'Session not found' });
      }
    });
  });

module.exports = router;
