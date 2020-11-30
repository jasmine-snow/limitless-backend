const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
  img: {type: String, required: false},
  comments: {type: String, default: false},
  description: {type: String, required: false},
  likes: {type: Number, default: 0}
})

module.exports = mongoose.model('Articles', articlesSchema)
