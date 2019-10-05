const Campground = require("../models/campground");
const Comment = require("../models/comment")

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/auth/signin");
}

function checkCampgroundOwnership(req, res, next) {
    // Is the user authenticated?
    if (req.isAuthenticated()) {
        //Does the user own the campground?
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (foundCampground.author.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Only Campground owners can delete their campgrounds");
                    res.redirect("back");
                }

            }
        });
    }
}

function checkCommentAuthor(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                req.flash("error", "Wrong Comment ID provided");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "Only comment authors can update or delete their comments");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/");
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership,
    checkCommentAuthor: checkCommentAuthor
}