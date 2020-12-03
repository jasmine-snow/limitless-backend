const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: { type: String, required: false },
    username: { type: String, required: false, unique: true},
    phone: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true }
})

module.exports = mongoose.model('Users', usersSchema)
