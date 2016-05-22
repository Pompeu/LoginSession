const User = require('../models/index').User;

function userHandler(req, res) {
  User
    .find({})
    .then(users => createRes(res, users));

}
module.exports = exports = userHandler;

function createRes (res, users) {
  res.render('restrict', {
    title : 'users',
    users : users 
  });
}
