const router = require("express").Router();
const user = require("../controllers/user");

router.post("/:id/follow", user.addFollow);
router.post("/:id/unfollow", user.unFollow);
router.get("/test", user.test);

module.exports = router;