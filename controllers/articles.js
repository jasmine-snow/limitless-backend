const express = require('express')
const router = express.Router()
const Articles = require("../models/articles.js")




router.get('/', (req, res) => {
  Articles.find({}, (error, foundPost) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundPost);
  })
})

router.post('/', async (req, res) => {
  Articles.create(req.body, (error, createdPost) => {
    if (error)
      res.status(400).json({ error: error.message });
    else {
      console.log('Created:', createdPost)
      res.status(200).json(createdPost)
    }
  })
})

router.get('/id/:id', (req, res) => {
	Articles.findById(req.params.id, (error, foundOnePost) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundOnePost);
  })
})

module.exports = router;
