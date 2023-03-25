const router = require("express").Router();

const controller = require("../controllers/global.controller");

router.get("/", controller.getAllData);

router.get("/:id", controller.getData);

router.post("/post", controller.postData);

router.put("/:id", controller.repairData);

router.delete("/:id", controller.deleteData);

module.exports = router;
