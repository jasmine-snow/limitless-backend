const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: false},
  img: {type: String, required: false},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  description: {type: String, required: false},
  likes: {type: Number, default: 0},
},  {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

module.exports = mongoose.model('Articles', articlesSchema)
