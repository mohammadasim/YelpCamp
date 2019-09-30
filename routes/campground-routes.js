const router = require('express').Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const checkLogin = require("../config/middleware");


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
router.post("/",checkLogin,(req, res) => {
    console.log(req.user);
    Campground.create({
        name: req.body.name,
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
router.get("/new",checkLogin,(req, res) => {
    res.render("campgrounds/new");
});

// Show an individual campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").populate("author").exec()
        .then((searchedCampground) => {
            res.render("campgrounds/show", {
                searchedCampground: searchedCampground
            });

        })
        .catch((err) => {
            console.log("An Error happened while retrieving campground ", err);
        });
});
//Edit Campground
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id).then((foundCampground)=>{
        res.render("campgrounds/edit", {campgroundToBeEdited: foundCampground});
    }).catch((err)=>{
        console.log("An Error happened while retreiving campground: ", err);
    });
});

//Update Campground
router.put("/:id", (req,res)=>{
    Campground.findOneAndUpdate({_id: req.params.id},{
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }).then((updatedCampground)=>{
        res.redirect("/campgrounds/" + updatedCampground._id);
    }).catch((err)=>{
        console.log("An Error happened while updating campground: ", err);
    })
});
// Delete Campground and associated comments
router.delete("/:id", (req, res)=>{
    Campground.findById(req.params.id, (err, campgroundToBeDeleted)=>{
        Comment.deleteOne({
            "_id" : {
                $in: campgroundToBeDeleted.comments
            }
        }).then(()=>{
            Campground.deleteOne(campgroundToBeDeleted).then(()=>{
                res.redirect("/campgrounds");
            }).catch((err) =>{
                console.log("An error happened while deleting campground: ", err);
            })
        }).catch((err)=>{
            console.log("An error happened while deleting comments associated with campground: ", err);
        })
    })
});
module.exports = router;