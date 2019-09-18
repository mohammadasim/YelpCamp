const mongoose = require("../connection");
//SCHEMA SETUP
var commentSchema = mongoose.Schema({
    text: String,
    author: String
  });
  
  // Export module
  module.exports = mongoose.model('Comment', commentSchema);