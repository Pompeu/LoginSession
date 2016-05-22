// file: models/user.js - created at 2015-11-28, 03:21

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email : {type : String, unique : true, required : true},
  password : {type : String, required : true}
});

module.exports = mongoose.model('User', schema);
