const express = require('express');
const {logger, validatePost, validateUser, validateUserId } =require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Users not found'
      })
    });
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad happened inside the users router"
  });
});

// do not forget to export the router

module.exports = router;