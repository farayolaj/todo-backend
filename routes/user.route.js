const express = require('express');

const { User } = require('./../db');

const router = express.Router();

router.route('/').
  post((req, res) => {
    const data = req.body;
    console.log(data);
    const user = new User(data);
    try {
      user.save();
      res.json({firstName: user.firstName, lastName: user.lastName, id: user.id, email: user.email});
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  });

module.exports = router;
