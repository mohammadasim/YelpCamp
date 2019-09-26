const mongoose = require("../config/connection");
const passportLocalMongoose = require("passport-local-mongoose");
//SCHEMA SETUP
var userSchema = mongoose.Schema({
  userName: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
// Export module
module.exports = mongoose.model('User', userSchema);