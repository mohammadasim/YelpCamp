const express = require("express"),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer"),
  passport = require("passport"),
  session = require("express-session"),
  methodOverRide = require("method-override"),
  flash = require("connect-flash")

const mongoose = require("./config/connection"),
  seedDB = require("./seeds"),
  keys = require("./config/keys"),
  passportSetup = require("./config/passport-setup");


const campgroundRoutes = require("./routes/campground-routes"),
  authRoutes = require("./routes/auth-routes"),
  commentRoutes = require("./routes/comments-routes"),
  indexRoutes = require("./routes/index-routes")




const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverRide("_method"));
/********************************* PASSPORT CONFIGURATION ***************************************/
app.use(session({
  secret: keys.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/**********************************************************************************************/
app.use(expressSanitizer()); //Important to place it after the body-parser use statement
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/**************************************** SETTING UP ROUTES **********************************/
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/auth",authRoutes);

/*********************************************************************************************/
app.set("view engine", "ejs");
mongoose.Promise = Promise;


/******************************* STARTING SERVER **********************************************/

const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);