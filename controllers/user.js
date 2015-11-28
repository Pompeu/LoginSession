// file: controllers/user.js - created at 2015-11-28, 03:23
const User = require('../models/index').User;
function userHandler(req, res) {

  var user = req.body;
  if(user.password === user.password2){
    delete user.password2;
    User.create(user).then(user => {
      if(user) res.json(user);
    }, err => {
      console.log(err);
    });

  }else {
    res.render('caduser', {title : 'cadauser', err : 'mail not eq'});
  }
}
module.exports = exports = userHandler;
