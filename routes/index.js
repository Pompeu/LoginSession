var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.js');
var middleware = require('../middlewares/index.js');

router
.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.get('/login',(req, res) => {
  res.render('login', {title : 'login'});
})
.get('/logout',(req, res) => {
  req.session.reset();
  res.redirect('/');
})
.post('/login',controller.login)

.get('/caduser',(req, res) => {
  res.render('caduser', {title : 'caduser'});
})
.post('/caduser',controller.user)

.get('/restrict',middleware.auth,(req,res) => {
  res.render('restrict',{title : "Restrito"});
});

module.exports = router;
