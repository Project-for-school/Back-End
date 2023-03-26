const router = require("express").Router();

const { globalController } = require("../controllers");

router.get("/", globalController.getAllData);

router.get("/:id", globalController.getData);

router.post("/post", globalController.postData);

router.put("/repair/:id", globalController.repairData);

router.delete("/delete/:id", globalController.deleteData);

module.exports = router;
