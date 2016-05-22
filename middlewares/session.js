// file: middlewares/session.js - created at 2015-11-28, 03:47
const User = require('../models/index').User;

function sessionHandler(req, res, next) {
  res.locals.csrfToken = req.csrfToken();

  if(req.session && req.session.user){
    User.findOne({
      email : req.session.user.email
    })
    .then(user => {
      req.user = user.toJSON();
      delete req.user.password;
      req.session.user  = req.user;
      res.locals.user = req.user;
      return next();
    });
  } else {
    return next();
  }
}
module.exports = exports = sessionHandler;
