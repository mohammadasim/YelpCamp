const mongoose = require("../config/connection");
//SCHEMA SETUP
var commentSchema = mongoose.Schema({
    text: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
  });
  // Export module
  module.exports = mongoose.model('Comment', commentSchema);