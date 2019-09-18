const mongoose = require("../connection");
//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
  });
  
  // Export module
  module.exports = mongoose.model('Campground', campgroundSchema);