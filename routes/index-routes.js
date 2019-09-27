const router = require('express').Router();

// Index route
router.get("/", (req, res) => {
    res.render("landing");
});

module.exports = router;