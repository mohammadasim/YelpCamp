const express = require("express");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const mongoose = require("./config/connection");
const expressSanitizer = require("express-sanitizer");
const seedDB = require("./seeds");
const keys = require("./config/keys");
const app = express();
const campgroundRoutes = require("./routes/campground-routes");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const User = require("./models/user");
const session = require("express-session");
const passportSetup = require("./config/passport-setup");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

/********************************* PASSPORT CONFIGURATION ***************************************/
app.use(session({
  secret: keys.session.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
/**********************************************************************************************/
app.use(expressSanitizer()); //Important to place it after the body-parser use statement
app.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  next();
});
app.use("/campgrounds", campgroundRoutes);
app.use("/auth", authRoutes);
app.set("view engine", "ejs");
mongoose.Promise = Promise;
seedDB();
/******************************** APP ROUTES ***************************************************/

app.get("/", (req, res) => {
  res.render("landing");
});

/******************************* STARTING SERVER **********************************************/

const port = process.env.PORT || 5000;
app.listen(port, () => `Yelp Camp server is running on port ${port} 🔥`);