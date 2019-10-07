const Campground = require("../models/campground");
const Comment = require("../models/comment")
const Review = require("../models/review");

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
                res.redirect("/campgrounds");
            } else {
                if (foundCampground.author.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Only Campground owners can delete their campgrounds");
                    res.redirect("/campgrounds");
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
                res.redirect("/campgrounds");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash("error", "Only comment authors can update or delete their comments");
                    res.redirect("/campgrounds");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/campgrounds");
    }
}

function checkReviewAuthor(req, res, next){
    if(req.isAuthenticated()){
        Review.findById(req.params.review_id).populate("author").exec((err,review)=>{
            if(err || !review){
                req.flash("error", "Review not found");
                res.redirect("/campgrounds");
            } else{
                if(review.author._id.equals(req.params.review_id)){
                    next();
                }else{
                    req.flash("error", "Only review owners can change their review");
                    res.redirect("/campgrounds");
                }
            }
        });

    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/campgrounds");
    }
}

function checkReviewExistance(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id).populuate({path: "reviews", populate:{path: "review"}}).exec((err,foundCampground)=>{
            if(err || !foundCampground){
                req.flash("error", "Camground no found");
                res.redirect("/campgrounds");
            }else{
                // check if user exists in the reviews of the campground
                // Using some() javascript method to find author id
                var foundUserReview = foundCampground.reviews.some((review)=>{
                    return review.author._id.equals(req.user._id);
                });
                if(foundUserReview){
                    req.flash("error", "You have already reviewed this campground");
                    req.redirect("/campgrounds");
                }else{
                    next();
                }

            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/campgrounds");
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership,
    checkCommentAuthor: checkCommentAuthor,
    checkReviewAuthor: checkReviewAuthor,
    checkReviewExistance: checkReviewExistance
}