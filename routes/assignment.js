const router = require("express").Router();

const { assignmentController } = require("../controllers");

router.get("/", assignmentController.getAllAssignment);

router.get("/:id", assignmentController.getAssignment);

router.post("/post", assignmentController.postAssignment);

router.put("/repair/:id", assignmentController.repairAssignment);

router.delete("/delete/:id", assignmentController.deleteAssignment);

module.exports = router;
