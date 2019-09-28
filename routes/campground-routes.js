const router = require('express').Router();
const Campground = require("../models/campground");


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
router.post("/", (req, res) => {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }).then(() => {
        res.redirect("/campgrounds");
    }).catch(err => {
        console.log("Error has happended while creating new campground ", err);
    })
});

//Form for creating new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

// Show an individual campground
router.get("/:id", (req, res) => {
    console.log("Now in the campground url, checking if the id is passed here or not");
    console.log("The id is "+ req.params.id);
    Campground.findById(req.params.id).populate("comments").exec()
        .then((searchedCampground) => {
            res.render("campgrounds/show", {
                searchedCampground: searchedCampground
            });

        })
        .catch((err) => {
            console.log("An Error happened while retrieving campground ", err);
        });
});

module.exports = router;