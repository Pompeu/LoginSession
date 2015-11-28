// file: middlewares/session.js - created at 2015-11-28, 03:47
const User = require('../models/index').User;

function sessionHandler(req, res, next) {
  if(req.session && req.session.user){
    User.findOne({email : req.session.user.email})
    .then(user => {
      req.user         = user;
      req.user.password = null;
      req.session.user = req.user;
      res.locals.user  = req.user;
      next();
    });
  }else {
    next();
  }
}
module.exports = exports = sessionHandler;
