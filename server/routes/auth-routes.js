const router = require("express").Router();
const passport = require("passport");
const config = require("../config/config")
const loginLogEmail = require("../middleware/loginLog")
// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    // get second time
    var midTime = performance.now()
    // var step3Time  = midTime -  req.user.step2Time
    res.json({
      success: true,
      message: "user has successfully been authenticated",
      user: req.user,
      cookies: req.cookies
    });
    // get total time
    let endTime = performance.now()
    var finalStepTime = endTime - midTime
    var step1Time = req.user.step1Time
    var step2Time = req.user.step2Time
    var userEmail = req.user.userEmail
  }
  step1Time ? loginLogEmail({step1Time, step2Time, finalStepTime, userEmail}) : null
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(config.CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/azure", passport.authenticate("adfs"));

// redirect to home page after successfully login via twitter
router.get(
  "/azure/redirect/auth/cbAdfs",
  passport.authenticate("adfs", {
    successRedirect: config.CLIENT_HOME_PAGE_URL,
    failureRedirect: config.CLIENT_ERROR_URL
  })
);

module.exports = router;
