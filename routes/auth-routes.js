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
      console.log("An error occured while creating new user: ", err);
      res.redirect("/register");
    }
    else{
      passport.authenticate("local")(req,res, ()=>{
        res.redirect("/campgrounds/");
      })
    }
  })
});

router.get("/signin", (req, res) => {
  res.render("auth/signin")
});
router.post("/signin", passport.authenticate("local", {
  successRedirect: "/campgrounds/",
  failureRedirect: "/auth/signin"
}));

router.get("/signout", (req, res) => {
  req.logOut();
  res.redirect("/");
});



module.exports = router;