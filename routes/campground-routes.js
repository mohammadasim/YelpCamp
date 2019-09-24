const router = require('express').Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");


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

router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
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

//***************************** COMMENTS ROUTES ************************************/

router.get("/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id).then((foundCampground) => {
            res.render("comments/new", {
                campground: foundCampground
            });
        })
        .catch((err) => {
            console.log("An Error occured while finding campground:", err);
        });
});

router.post("/:id/comments", (req, res) => {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Campground.findById(req.params.id).then((foundCampground) => {
        Comment.create(req.body.comment).then((createdComment) => {
            foundCampground.comments.push(createdComment);
            foundCampground.save().then((updatedCampground) => {
                res.redirect("/campgrounds/" + updatedCampground._id);
            })
        })
    }).catch((err) => {
        console.log("An error occured while retrieving the campground:", err);
        res.redirect("/campgrounds");
    })
});

module.exports = router;