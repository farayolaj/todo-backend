const express = require('express');
const createError = require('http-errors');

const { User } = require('./../db');

const router = express.Router();

router.route('/').
  post((req, res) => {
    const data = req.body;
    console.log(data);
    const user = new User(data);
    try {
      if (!user) throw createError(400, 'User does not exist');
      user.save();
      res.json({firstName: user.firstName, lastName: user.lastName, id: user.id, email: user.email});
    } catch (error) {
      throw createError(500, error);
    }
  });

module.exports = router;
