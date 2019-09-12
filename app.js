const express = require("express");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");


// DB CONNECTION SETUP
var DATABASE_URL = process.env.MONGODB_DATABASE_URL;
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to the database!!");
});

//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
});

// Mongoose Model setup
var Campground = mongoose.model('Campground', campgroundSchema);

// APP ROUTES
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find((err, results) => {
    if (err) {
      console.log('An Error was thrown: ', err)
    } else {
      res.render("index", {
        campgrounds: results
      });
    }
  })
});

app.post("/campgrounds", (req, res) => {
  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  }, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id,(err, searchedCampground)=>{
    if(err){
      console.log('An error has happened ', err)
    } else{
      res.render("show", {searchedCampground:searchedCampground});  
    }
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);