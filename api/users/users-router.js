// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = require('express').Router();
const Users = require('./users-model');
const { restricted } = require('../auth/auth-middleware');

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

router.get('/', restricted, (req, res, next) => {
  // res.json('hello from users endpoint')
  Users.find()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})


// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;
