const router = require("express").Router();
const index = require("../controllers");
const middlewares = require("./middlewares");

router.get("/", index.indexRender);
router.get("/join", middlewares.isNotLoggedIn, index.join);
router.get("/profile", middlewares.isLoggedIn, index.profile);
router.get("/rank", middlewares.isLoggedIn, index.rank);

module.exports = router;