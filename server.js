const express = require('express')
const app = express()
const PORT = 3003


const profilesController = require('./controllers/profiles.js')
app.use('/profiles', profilesController)

app.listen(PORT, () => {
  console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})
