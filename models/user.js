const mongoose = require("../config/connection");
//SCHEMA SETUP
var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String
  });
  
  // Export module
  module.exports = mongoose.model('User', userSchema);