const router = require("express").Router();

const { infoController } = require("../controllers");

router.get("/", infoController.getAllPosts);

router.get("/:id", infoController.getPost);

router.post("/post", infoController.postInfo);

router.put("/repair/:id", infoController.repairPost);

router.delete("/delete/:id", infoController.deletePost);

module.exports = router;
