const express = require("express");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const mongoose = require("./connection");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB     = require("./seeds");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
mongoose.Promise = Promise;

seedDB();


// APP ROUTES
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find()
  .then((campgrounds)=>{
    res.render("campgrounds/index", {campgrounds: campgrounds});
  })
  .catch(err =>{
    console.log("Error occured while retrieving campgrounds ", err);
  })
});

app.post("/campgrounds", (req, res) => {
  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  }).then(()=>{
    res.redirect("/campgrounds");
  }) .catch(err =>{
    console.log("Error has happended while creating new campground ", err);
  })
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec()
  .then((searchedCampground)=>{
      res.render("campgrounds/show", {searchedCampground:searchedCampground});
    
    })
  .catch((err)=>{
    console.log("An Error happened while retrieving campground ", err);
  });
});

//***************************** COMMENTS ROUTES ************************************/

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id).then((foundCampground) =>{
    res.render("comments/new", {campground:foundCampground});
  })
  .catch((err) =>{
    console.log("An Error occured while finding campground:",err);
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id).then((foundCampground) =>{
    Comment.create(req.body.comment).then((createdComment)=>{
      foundCampground.comments.push(createdComment);
      foundCampground.save().then((updatedCampground)=>{
        res.redirect("/campgrounds/" + updatedCampground._id);
      })
    })
  }).catch((err)=>{
    console.log("An error occured while retrieving the campground:", err);
    res.redirect("/campgrounds");
  })
});
const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);