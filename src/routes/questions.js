const router = require("express").Router();

const { questionsController } = require("../controllers");

router.get("/", questionsController.getAllData);

router.get("/:id", questionsController.getData);

router.post("/post", questionsController.postQuestion);

router.put("/repair/:id", questionsController.repairQuestion);

router.delete("/delete/:id", questionsController.deleteQuestion);

module.exports = router;
