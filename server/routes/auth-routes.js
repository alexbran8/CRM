const router = require("express").Router();
const passport = require("passport");
const config = require("../config/config")
const loginLogEmail = require("../middleware/loginLog")
const authCheckMiddleware = require('../middleware/auth-check')

  //secured api routes with no redirect
  function authorizeApi(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
      else return     res.status(401).json({
       message : "User Not Authenticated",
       user : null,
       success: false,
     })
    
}


// when login is successful, retrieve user info
router.get("/login/success",authorizeApi, (req, res) => {
  if (req.isAuthenticated() || req.user) {
    // get second time
    // console.log(req.body.start)
    // var midTime = performance.now()
    // var step3Time  = midTime -  req.user.step2Time
    res.json({
      success: true,
      message: "user has successfully been authenticated",
      user: req.user,
      cookies: req.cookies
    });
    // get total time
    // let endTime = performance.now()
    // var finalStepTime = `${endTime - midTime} milliseconds`
    // // var step0Time = req.body.start - 
    // var step1Time = req.user.step1Time
    // var step2Time = req.user.step2Time
    // var userEmail = req.user.userEmail
  }
  // console.log(req)
// if (err) {
//     console.log('here')
//     // req.logout();
//     return next(err);
//     // # redirect status
//     // "/azure", passport.authenticate("adfs")
// }
  // step1Time ? loginLogEmail({step1Time, step2Time, finalStepTime, userEmail}) : null
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

// auth with azure
router.get("/azure", passport.authenticate("adfs"));

// redirect to home page after successfully login
router.get(
  "/azure/redirect/auth/cbAdfs",
  passport.authenticate("adfs", {
    successRedirect: config.CLIENT_HOME_PAGE_URL,
    failureRedirect: config.CLIENT_ERROR_URL
  })
);

module.exports = router;
