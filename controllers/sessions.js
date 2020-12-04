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
        console.log("logged in: ", foundUser)
      } else {
        res.status(401).json({error: "not a match"});
      }
    }
  })
});


// logout
// sessions.get('/:id', (req, res) => {
//   User.findOne({ email: req.body.email }, (error, foundUser) => {
//     if (error) {
//       console.log(error);
//       res.status(400).json({error: error.message});
//     } else if (!foundUser) {
//       res.status(400).json({error: "Already logged out"});
//     } else {
//       if (req.session.currentUser = foundUser) {
//          req.session.destroy((error) => {
//         res.redirect('/login')
//       })
//       }
//     }
//   })
// });


// await req.session.destroy((error) => {
// res.redirect('/login')
// })
// if (error)
//   res.status(400).json({error: error.message});
// else
//   res.status(200).json();
//   res.redirect('/login')
//   console.log("logged out")
module.exports = sessions;
