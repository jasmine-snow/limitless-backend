const express = require('express')
const router = express.Router()
const Articles = require("../models/articles.js")
const User = require('../models/users.js');



router.get('/', async (req, res) => {
  Articles.find({}, (error, foundPost) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundPost);
  })

})


router.post('/', (req, res) => {
  const ArticleData = {...req.body}

  console.log("this is the session:", req.session)
  ArticleData.userId =  req.session.currentUser._id
  Articles.create(ArticleData, (error, createdPost) => {
    if (error)
      res.status(400).json({ error: error.message });
    else {
      console.log('Created one post:', createdPost)
      res.status(200).json(createdPost)
    }
  })
})

router.get('/id/:id', (req, res) => {
	Articles.findById(req.params.id, (error, foundOnePost) => {
    if (error)
      res.status(400).json({error: error.message});
    else
    console.log('Show one post:', foundOnePost)
      res.status(200).json(foundOnePost);
  })
})



router.delete('/:id', (req, res) => {
  Articles.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err)
      res.status(400).json({ error: err.message });
    else {
      console.log('Deleted Post:', deletedPost)
      res.status(200).json(deletedPost);
    }
  })
})

router.put('/:id', (req, res) => {
  Articles.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
    if (err)
      res.status(400).json({ error: err.message });
    else {
      console.log('Updated Post:', updatedPost);
      res.status(200).json(updatedPost)
    }
  });
});

module.exports = router;
