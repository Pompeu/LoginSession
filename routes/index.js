const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.js');
const middleware = require('../middlewares/index.js');

module.exports = router
  .get('/', (req, res) => {
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

  .post('/caduser', controller.usersCreate)

  .get('/restrict', middleware.auth, controller.users); 
