const router = require("express").Router();

const index = require("../controllers");

router.get("/", index.indexRender);
router.get("/join", index.join);
router.get("/rank", index.rank);

module.exports = router;