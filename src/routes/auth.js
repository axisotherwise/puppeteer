const router = require("express").Router();
const auth = require("../controllers/auth");
const middlewares = require("./middlewares");
const passport = require("passport");

router.post("/join", middlewares.isNotLoggedIn, auth.join);
router.post("/login", middlewares.isNotLoggedIn, auth.login);

router.get("/google", async (req, res, next) => {
  passport.authenticate("google", { scope: ["email"]});
});
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
}), (req, res) => {
  res.redirect("/profile");
});
module.exports = router;