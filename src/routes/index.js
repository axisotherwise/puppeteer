const router = require("express").Router();

const index = require("../controllers");

router.get("/", index.indexRender);

module.exports = router;