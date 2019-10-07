const router = require('express').Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../config/middleware");
const isLoggedIn = middleware.isLoggedIn;
const checkCampgroundOwnership = middleware.checkCampgroundOwnership;


// Show all campgrounds
router.get("/", (req, res) => {
    Campground.find()
        .then((campgrounds) => {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        })
        .catch(err => {
            console.log("Error occured while retrieving campgrounds ", err);
        })
});

//Create new campground
router.post("/", isLoggedIn, (req, res) => {
    Campground.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: req.user
    }).then(() => {
        res.redirect("/campgrounds");
    }).catch(err => {
        console.log("Error has happended while creating new campground ", err);
    })
});

//Form for creating new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// Show an individual campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate({
        path: "author",
        model: "User"
    }).populate({
        path: "comments",
        model: "Comment"
    }).populate({
        path: "reviews",
        model: "Review",
        populate: {
            path: "author",
            model: "User"
        }
    }).exec().then((searchedCampground) => {
        if (!searchedCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {
                searchedCampground: searchedCampground
            });
        }
    })
        .catch((err) => {
            console.log("An Error happened while retrieving campground ", err);
            req.flash("error", "Invalid camground ID provided");
            res.redirect("back");
        });
});
//Edit Campground
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id).then((foundCampground) => {
        res.render("campgrounds/edit", {
            campgroundToBeEdited: foundCampground
        });
    }).catch((err) => {
        console.log("An Error happened while retreiving campground: ", err);
    });
});

//Update Campground
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findOneAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }).then((updatedCampground) => {
        req.flash("success", "Campground successfully updated");
        res.redirect("/campgrounds/" + updatedCampground._id);
    }).catch((err) => {
        console.log("An Error happened while updating campground: ", err);
    })
});
// Delete Campground and associated comments
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id).then((campgroundToBeDeleted) => {
        // Two step removing process was undertaken to ensure the pre middleware in the campground model is invoked
        campgroundToBeDeleted.delete().then(() => {
            req.flash("success", "Campground successfully deleted");
            res.redirect("/campgrounds");
        })
    }).catch((err) => {
        console.log("An Error happened while deleting a campground: ", err);
        res.redirect("/campgrounds");
    })
});
module.exports = router;