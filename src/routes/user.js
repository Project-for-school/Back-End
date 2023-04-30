const router = require("express").Router();
const verifyToken = require("../middleware/verify_token");
const { userController } = require("../controllers");
const { isModeratorOrAdmin } = require("../middleware/verify_role");
router.use(verifyToken);

router.get("/", userController.getUserCurrent);

router.get("/alldata", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.put("/repair/:id", userController.changePassword);

router.delete("/delete/:id", isModeratorOrAdmin, userController.deleteUser);

module.exports = router;
