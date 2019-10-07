const router = require('express').Router({
  mergeParams: true
});
const Campground = require("../models/campground"),
  Review = require("../models/review"),
  helper = require("../config/helper"),
  middleware = require("../config/middleware"),
  calculateAverage = helper.calculateAverage,
  User = require("../models/user")

const isLoggedIn = middleware.isLoggedIn;
const checkReviewExistence = middleware.checkReviewExistance;


router.get("/", (req, res) => {
  res.send("You have called the review index route");
});

// form for new review
router.get("/new", isLoggedIn, checkReviewExistence,(req, res) => {
  Campground.findById(req.params.id).then((foundCampground) => {
    if (!foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      res.render("reviews/new", {
        campground: foundCampground
      });
    }
  }).catch((err) => {
    req.flash("error", "An error happened while retrieving campground");
  });
});

//Create new review
router.post("/", isLoggedIn, checkReviewExistence, (req, res) => {
  Campground.findById(req.params.id).then((foundCampground) => {
    if (!foundCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      Review.create({
        rating: parseInt(req.body.rating),
        text: req.body.text,
      }).then((newReview) => {
        // Find the Author for the review
        User.findById(req.user._id).then((reviewAuther) => {
          newReview.author = reviewAuther;
          newReview.campground = foundCampground;
          newReview.save().then((reviewWithUserAndCampground) => {
            // Add review to Campground
            foundCampground.reviews.push(reviewWithUserAndCampground);
            // Populate review to retrieve review rating
            foundCampground.populate({ path: "reviews", populate: { path: "review" } }).execPopulate().then((campground) => {
              campground.rating = calculateAverage(campground.reviews);
              campground.save().then((updatedCampground) => {
                req.flash("success", "Review successfully added");
                res.redirect("/campgrounds/" + updatedCampground._id);
              }).catch((err) => {
                req.flash("error", err.message);
                res.redirect("/campgrounds");
              });
            })
          }).catch((err) => {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
          });
        }).catch((err) => {
          req.flash("error", err.message);
          res.redirect("/campgrounds");
        });
      }).catch((err) => {
        console.log("An error has happened while creating new review:", err);
        req.flash("error", err.message);
        res.redirect("/campgrounds");
      })

    }
  });
});




module.exports = router;