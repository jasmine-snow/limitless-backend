const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const User = require("../models/users.js");



// users index
router.get('/', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, registerUser) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(registerUser);
    });
});

// register
router.post('/register', (req, res) => {
User.find({username: `${req.body.username}`}, (err, results) => {
  if (err)
   res.status(400).json({ error: error.message});
   else if (results.length)
    res.status(400).json({ error: "Username has been used "});
    else {

    const userPassword = req.body.password
       const securePassword = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10))
       const userProfile = ({
         name: req.body.name,
         username: req.body.username,
         phone: req.body.phone,
         email: req.body.email,
         password: securePassword
       })

        User.create(userProfile, (error, createdUser) => {
         if (error) {
           res.status(400).json({ error: error.message })
         }
         console.log('Registered:', createdUser)
         res.status(200).json(createdUser)
        })
    }
  })
})

module.exports = router
