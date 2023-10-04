const User = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {

  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl 
console.log(`[${timeStamp}] ${method} to ${url}`)
next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'no such user'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an issue finding user"
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
console.log('validateUser middleware')
next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
console.log('validatePost middleware')
next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}