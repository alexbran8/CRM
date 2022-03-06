const router = require("express").Router();
const passport = require("passport");
const refresh = require('passport-oauth2-refresh');
const config = require("../config/config")
const loginLogEmail = require("../middleware/loginLog")
const authCheckMiddleware = require('../middleware/auth-check')
const strategy = require("../config/passport-setup")
const adfsStrategy = require('../config/passport-adfs')
const { OAuth2 } = require('oauth');


//secured api routes with no redirect
function authorizeApi(req, res, next) {
  console.log(req)
  if (req.isAuthenticated()) {
    return next();
  }
  else return res.status(401).json({
    message: "User Not Authenticated",
    user: null,
    success: false,
  });
  console.log('user not auth request')

}


// when login is successful, retrieve user info
router.post("/login/success", authorizeApi, (req, res) => {
  res.json({
    success: true,
    message: "user has successfully been authenticated",
    user: req.user,
    refreshToken: '0.ARAAURdHXXWWjUKRe3D0T5YwsBoEVLa35gZOlSyf9Epr7BoQANU.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-4mVQQzX1aLEH73H56ArXFbeQDavu_S_pT_14erK8GKj4MEhqVLXlUVIqLOPJs-uTlFp7lb_wIUEMj-vwUyw_GvM7VoniDHtdZNs-Sq2L12n-7yTW9yIejvZO6cpjdODeImQgHjHyAE90t4Zs7Po5QXezF_e-FNiSz1OE6-j9LZ5-5ojFPLLb1jVGONuADOdaiVDnD5Oyd0JPa-zVkyoCwNQP6aAjraP54S_pq1QqkuiYwXJOA60T5Z2u8kEERBi4eyvj1_pfXJWuvcuhvziAuZZetNtNPbrCBiGZKCYezmP7u91oWA3FuM8aHrhXFraWQD3ydCfsLluNtPZUbxgNFKGTVO_svJNTav1j-kCbYCSVbHQq-yiH6YnE1PUx6jkX610W0tkLkKsMso7T5RdpHPk1f0sqJMSQvGmUxP9VijjT7YXfcV-mJrXZD5AbOCVlFarrYzQR7vN2EIQkAQRqoyE6JeJoSkD9Wvidvd29g8Bd3pGAi2tfpJrf_L7IOiSVLzDk86fEt_l2mNgcVzz4WYUBv1q8o3_qja0LPvyy1qkQMikI6JU4i5ukkCBL9mQESecTXnxVxP_WDeXCJyiqPSnzLZneLsSX3KwimMrnD7OizdcsjIFmGLjMLjvVe6wFRycIbl04y_LUBsVdP8Ihcdw_CiZ2cICgqY3PHZ4MRS0wcajxIJpQFL1yeV7rzR95AGOu4YsSrePmwR6w81dWQn_tIg4ZtiD_MDgNG1ayFcraNOiXzKCCh5nMcS3az0DGefbrAYlMtJ-OVHrqkPDhLWYO541KpwSSCFklsDL6ot2mxZnUr4Qj629eu-203IYjVcenGTPh0rI-JcqemjLL_6X_uHWjGo99a_5taO8GNowxZy2sEQOG5Ey5hNzmIIMJL88PJCSZqFyM8-J1DYnQWRRc_dPaiR2JvbuR1EFKt7ZYJaPJSlckxVfJKgYzeWuJL6S_glhF97DBgHHHXyI4TtjBfAfp2_iFqR5hYU4yY3NbTL0aR0Q0hrHpS01sz3BRUgTX707Kufl4rqE76XriUSqBZC_5nGDOcshM4z1aP35WGJ35IMPqQSNc1t9Y6LQJcSKUYuEEsOwLY7_zRBa4ZK2mR-79SEoV6X-3zBRiM-t0hDosJdYvPGl1Ht262izp5xm_7bchcyzP2tLzpXoLqljfDBV386bCDIankk6XbHuf6lgrwf_62OUqAWsiiwmCjtqI44zVuTO--EKtMqjfqfKH7RDk_gS1ApM_prbxir_Q',
    cookies: req.cookies
  });
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

router.post('/refresh', function (req, res) {
  console.log(req.body.refreshToken)
  var refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    console.warn('No refresh token to refresh');
    res.sendStatus(401);
    return;
  }
  else {
    console.warn('Refresh in progress');
    console.log(refreshToken)
    
    refresh.requestNewAccessToken(strategy, refreshToken, function (err, accessToken) {
      if (err) {
        console.error(err && err.stack || err);
        res.sendStatus(401);
        return;
      }
      res.cookie('access_token', accessToken);
      res.sendStatus(200);
    });
  }
});

// redirect to home page after successfully login
router.get(
  "/azure/redirect/auth/cbAdfs",
  passport.authenticate("adfs", {
    successRedirect: config.CLIENT_HOME_PAGE_URL,
    failureRedirect: config.CLIENT_ERROR_URL
  })
);

module.exports = router;
