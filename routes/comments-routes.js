const router = require('express').Router({
    mergeParams: true
});
const Comment = require("../models/comment");
const middleware = require("../config/middleware");
const isLoggedIn = middleware.isLoggedIn;
const Campground = require("../models/campground");
const removeComment = require("../config/helper");
const checkCommentAuthor = middleware.checkCommentAuthor;


//Comments new
router.get("/new", isLoggedIn, (req, res) => {
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
router.post("/", isLoggedIn, (req, res) => {
    req.body.comment.text = req.sanitize(req.body.comment.text);
    Campground.findById(req.params.id).then((foundCampground) => {
        Comment.create(req.body.comment).then((createdComment) => {
            // add username and id to comment
            createdComment.author.id = req.user._id;
            createdComment.author.username = req.user.username;
            // Save comment
            createdComment.save().then((commentWithUser) => {
                // Add comment to campground
                foundCampground.comments.push(commentWithUser);
                foundCampground.save().then((updatedCampground) => {
                    req.flash("success", "Comment successfully added");
                    res.redirect("/campgrounds/" + updatedCampground._id);
                })
            })
        })
    }).catch((err) => {
        console.log("An error occured while retrieving the campground:", err);
        res.redirect("/campgrounds");
    })
});
//Edit Comment Form
router.get("/:comment_id/edit", checkCommentAuthor, (req, res) => {
    Comment.findById(req.params.comment_id).then((foundComment) => {
        res.render("comments/edit", {
            campground_id: req.params.id,
            comment: foundComment
        });
    }).catch(() => {
        res.redirect("/back");
    });

});

//Update comment Put route
router.put("/:comment_id", checkCommentAuthor, (req, res) => {
    // check the answer to this sof question: https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    Comment.findOneAndUpdate({_id: req.params.comment_id}, {
        text: req.body.text
    }, {
        returnNewDocument: true
    }).then((updatedComment)=>{
        req.flash("success", "Comment successfully updated");
        res.redirect("/campgrounds/" + req.params.id);
    }).catch((err)=>{
        console.log("An Error has occured while updating comment: ", err);
            res.redirect("back");
    });
});

//Delete comment
router.delete("/:comment_id", checkCommentAuthor, (req, res) => {
    Campground.findById(req.params.id).then((foundCampground) => {
        foundCampground.comments = removeComment(foundCampground.comments, req.params.comment_id);
        foundCampground.save().then(() => {
            Comment.findOneAndDelete(req.params.comment_id).then(() => {
                req.flash("success", "Comment successfully deleted");
                res.redirect("/campgrounds/" + req.params.id);
            })
        })
    })
});

module.exports = router;