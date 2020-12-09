const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');


// sign in
sessions.post('/', (req, res) => {
  console.log(req.body)
  User.findOne({ email: req.body.email }, (error, foundUser) => {
    if (error) {
      console.log(error);
      res.status(400).json({error: error.message});
    } else if (!foundUser){
      res.status(400).json({error: "not a match"});
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.status(200).json(foundUser)
        console.log("logged in: ", foundUser)
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
      console.log("logged out")
  })
});


module.exports = sessions;
