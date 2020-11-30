const express = require('express')
const profiles = express.Router()

profiles.get('/', (req, res) => {
  res.send('index')
})

module.exports = profiles
