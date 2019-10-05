const router = require('express').Router();
const User = require("../models/user");
const passport = require("passport");


// new user registration form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {

  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password,(err, user)=>{
    if(err){
      req.flash("error", err.message);
      res.redirect("/auth/register");
    }
    else{
      passport.authenticate("local")(req,res, ()=>{
        req.flash("success", "Successfully signed up");
        res.redirect("/campgrounds/");
      })
    }
  })
});

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});
router.post("/signin", passport.authenticate("local", {
  successRedirect: "/campgrounds/",
  failureRedirect: "/auth/signin"
}));

router.get("/signout", (req, res) => {
  req.logOut();
  req.flash("success", "Successfully signed out");
  res.redirect("/");
});



module.exports = router;