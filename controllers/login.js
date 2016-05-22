// file: controllers/login.js - created at 2015-11-28, 03:34
const User = require('../models/index').User;

function loginHandler(req, res) {
  const user = req.body;

  User.findOne({
    email : user.email
  })
  .then(udb => {
    if(udb.password === user.password) {
      req.session.user = udb.toJSON();
      //importante :P
      delete req.session.user.password;
      res.redirect('/');
    } else {
      loginError(res);
    }
  } , () => {
    loginError(res);
  })
  .catch(() => { 
    loginError(res);
  });
}

module.exports = exports = loginHandler;

function loginError (res) {
  return res.render('login',{ 
    title : 'login',
    msg   : 'erro ao logar'
  });
}
