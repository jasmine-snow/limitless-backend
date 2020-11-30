const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

// sign in
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (error) {
      console.log(error);
      res.status(400).json({error: error.message});
    } else if (!foundUser){
      res.status(400).json({error: "not a match"});
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.status(200).json(foundUser)
      } else {
        res.status(401).json({error: "not a match"});
      }
    }
  })
});

// logout
sessions.delete('/', (req, res) => {
  req.session.destroy((error) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json();
  })
});

module.exports = sessions;
