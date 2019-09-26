const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");




passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/******************************* LOCAL STRATEGY *************************************/
passport.use(new LocalStrategy(User.authenticate()));