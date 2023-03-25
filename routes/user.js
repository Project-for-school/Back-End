const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUser);

router.put("/:id", controller.changePassword);

router.delete("/:id", controller.deleteUser);

module.exports = router;
