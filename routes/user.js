const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.put("/:id", userController.changePassword);

router.delete("/:id", userController.deleteUser);

module.exports = router;
