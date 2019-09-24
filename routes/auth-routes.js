const router = require('express').Router();

router.get("/signin", (req, res) => {
  res.render("auth/signin")
});





module.exports = router;