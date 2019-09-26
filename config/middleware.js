function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/signin");
}

module.exports = isLoggedIn;
