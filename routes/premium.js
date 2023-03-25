const router = require("express").Router();

const controller = require("../controllers/premium.controller");

router.get("/", controller.getPosts);

router.get("/:id", controller.getPost);

router.post("/post", controller.postPremium);

router.put("/:id", controller.repairPost);

router.delete("/:id", controller.deletePost);

module.exports = router;
