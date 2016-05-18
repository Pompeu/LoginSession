// file: middlewares/auth.js - created at 2015-11-28, 04:43
function authHandler(req, res, next) {
  if(req.user) {
    return next();
  }else {
    res.redirect('login');
  }
}
module.exports = exports = authHandler;
