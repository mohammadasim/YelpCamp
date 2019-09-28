const router = require('express').Router({mergeParams: true});
const Comment = require("../models/comment");
const checkLogin = require("../config/middleware");
const Campground = require("../models/campground");


//Comments new
router.get("/new",checkLogin,(req, res) => {
    Campground.findById(req.params.id).then((foundCampground) => {
            res.render("comments/new", {
                campground: foundCampground
            });
        })
        .catch((err) => {
            console.log("An Error occured while finding campground:", err);
        });
});

//Comments create
router.post("/",checkLogin,(req, res) => {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Campground.findById(req.params.id).then((foundCampground) => {
        Comment.create(req.body.comment).then((createdComment) => {
            // add username and id to comment
            createdComment.author.id = req.user._id;
            createdComment.author.username = req.user.username;
            // Save comment
            createdComment.save().then((commentWithUser)=>{
                // Add comment to campground
                foundCampground.comments.push(commentWithUser);
                foundCampground.save().then((updatedCampground)=>{
                    res.redirect("/campgrounds/" + updatedCampground._id);
                })
            })
        })
    }).catch((err) => {
        console.log("An error occured while retrieving the campground:", err);
        res.redirect("/campgrounds");
    })
});
module.exports = router;