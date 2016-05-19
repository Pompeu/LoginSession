// file: controllers/user.js - created at 2015-11-28, 03:23
const User = require('../models/index').User;

function userHandler(req, res) {
  var user = req.body;
  if(user.password === user.password2){
    delete user.password2;
    User.create(user).then(user => {
      if (user) {
        res.render('user-details', {
          title : 'user details',
          user : user
        });
      }
    }, err => {
      createError(res, err);
    })
    .catch(err => {
      createError(res, err);
    });

  } else {
    createError(res);
  }
}

module.exports = exports = userHandler;

function createError (res, err) {
  res.render('caduser', {
    title : 'cadauser',
    err   : err ||'mail not eq'
  });
}


