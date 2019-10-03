const Campground = require("../models/campground");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/signin");
}

function checkCampgroundOwnership(req, res, next) {
    // Is the user authenticated?
    if (req.isAuthenticated()) {
        //Does the user own the campground?
        Campground.findById(req.params.id).then((foundCampground) => {
            if (foundCampground.author.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        })
    } else {
        res.redirect("/");
    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkCampgroundOwnership: checkCampgroundOwnership
}