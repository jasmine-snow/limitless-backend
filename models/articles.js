const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: false},
  img: {type: String, required: false},
  comments: {type: String, default: false},
  description: {type: String, required: false},
  likes: {type: Number, default: 0}
})

module.exports = mongoose.model('Articles', articlesSchema)
