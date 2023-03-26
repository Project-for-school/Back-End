const router = require("express").Router();

const { authController } = require("../controllers");
const middleware = require("../middleware/");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.requestRefreshToken);

router.post("/logout", middleware.verifyToken, authController.logOut);

module.exports = router;
