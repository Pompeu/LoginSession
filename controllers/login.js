// file: controllers/login.js - created at 2015-11-28, 03:34
const User = require('../models/index').User;
function loginHandler(req, res) {
  var user = req.body;

  User.findOne({email : user.email})
    .then(u => {
      if(u.password === user.password) {
        req.session.user = u;
        res.redirect('/');
      } else {
        loginError(res);
      }
    } , err => {
      res.json({err : err});
    })
    .catch(() => { 
      loginError(res);
    });
}

module.exports = exports = loginHandler;

function loginError (res) {
  return res.render('caduser',{ 
    title : 'caduser',
    msg   : 'erro ao logar'
  });
}
