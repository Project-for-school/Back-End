const router = require("express").Router();

const { subjectController } = require("../controllers");

router.get("/", subjectController.getAllSubjects);

router.get("/:id", subjectController.getSubject);

router.post("/post", subjectController.postSubject);

router.put("/repair/:id", subjectController.repairSubject);

router.delete("/delete/:id", subjectController.deleteSubject);

module.exports = router;
