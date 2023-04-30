const router = require("express").Router();

const { authController } = require("../controllers");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.requestRefreshToken);

router.post("/logout", authController.logOut);

module.exports = router;
