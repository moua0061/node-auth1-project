const User = require('../users/users-model');
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  console.log('you are in the restricted middleware');
  next()
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree(req, res, next) {
  // console.log('you are in the check user name is free middleware');
  // next()
  User.findBy({ username: req.body.username })
    .then(users => {
      // console.log(user)
      if(!users.length) { //google this .length
        next()
      } else {
        res.json({
          status: 422,
          message: 'Username taken'
        })
      }
    })
    .catch(next)
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists(req, res, next) {
  // console.log('you are in the check if username exists middleware');
  // next()
  User.findBy({ username: req.body.username })
    .then(users => {
      // console.log(user)
      if(users.length) { //google this .length
        next()
      } else {
        res.json({
          status: 401,
          message: 'Invalid credentials'
        })
      }
    })
    .catch(next)
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  // console.log('you are in the check password length middleware');
  // next()
  if( !req.body.password || req.body.password.length < 3 ) {
    next({
      message: 'Password must be longer than 3 chars',
      status: 422
    })
  } else {
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
}