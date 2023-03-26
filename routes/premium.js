const router = require("express").Router();

const { premiumController } = require("../controllers");

router.get("/", premiumController.getPosts);

router.get("/:id", premiumController.getPost);

router.post("/post", premiumController.postPremium);

router.put("/repair/:id", premiumController.repairPost);

router.delete("/delete/:id", premiumController.deletePost);

module.exports = router;
