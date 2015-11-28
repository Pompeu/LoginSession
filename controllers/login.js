// file: controllers/login.js - created at 2015-11-28, 03:34
const User = require('../models/index').User;
function loginHandler(req, res) {
  var user = req.body;
  User.findOne({email : user.email})
  .then(u => {
    if(u.password === user.password) {
      req.session.user = u;
      res.redirect('/');
    }else {
      res.render('caduser',{ msg : "erro ao logar"});
    }
  } , err => {
    res.json({err : err});
  });
}
module.exports = exports = loginHandler;
