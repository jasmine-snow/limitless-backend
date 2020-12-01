const express = require('express')
const router = express.Router()

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
         username: req.body.username,
         password: securePassword,
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone,
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


router.get('/', (req, res) => {
  res.send('index')
})
module.exports = router
