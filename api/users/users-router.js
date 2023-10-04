const express = require('express');
const {logger, validatePost, validateUser, validateUserId } =require('../middleware/middleware');
const User = require('./users-model');
const Post = require('../posts/posts-model');


const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name })
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
   await User.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }

});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)
});

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    customMessage: 'something bad happened inside posts router',
    message: err.message,
    stack: err.stack
  })
} )


// do not forget to export the router

module.exports = router;