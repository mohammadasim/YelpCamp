const mongoose = require("../config/connection");
//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  });
  
  // Export module
  module.exports = mongoose.model('Campground', campgroundSchema);