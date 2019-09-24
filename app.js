const express = require("express");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const mongoose = require("./config/connection");
//const Campground = require("./models/campground");
const expressSanitizer = require("express-sanitizer");
//const Comment = require("./models/comment");
const seedDB     = require("./seeds");
const keys = require("./config/keys");
const app = express();
const campgroundRoutes = require("./routes/campground-routes");
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressSanitizer()); //Important to place it after the body-parser use statement
app.use('/campgrounds', campgroundRoutes);
app.set("view engine", "ejs");
mongoose.Promise = Promise;

seedDB();


// APP ROUTES
app.get("/", (req, res) => {
  res.render("landing");
});


const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);