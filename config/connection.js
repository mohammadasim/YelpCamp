const mongoose = require("mongoose"),
      keys = require("./keys")


// DB CONNECTION SETUP
var DATABASE_URL = keys.mongodb.mongodb_url;
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).catch((err)=>{
    console.log("An error happened while connecting to db: ", err.message);
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to the database!!");
});

module.exports = mongoose;