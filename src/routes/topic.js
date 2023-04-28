const router = require("express").Router();

const { topicController } = require("../controllers");

router.get("/", topicController.getAllTopics);

router.get("/:id", topicController.getTopic);

router.post("/post", topicController.postTopic);

router.put("/repair/:id", topicController.repairTopic);

router.delete("/delete/:id", topicController.deleteTopic);

module.exports = router;
