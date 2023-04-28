const router = require("express").Router();

const { userController } = require("../controllers");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.put("/repair/:id", userController.changePassword);

router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
