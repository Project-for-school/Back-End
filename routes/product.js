const router = require("express").Router();

const controller = require("../controllers/products.controller");

router.get("/", controller.getProducts);

router.get("/:id", controller.getProduct);

router.post("/post", controller.postProduct);

router.put("/:id", controller.repairProduct);

router.delete("/:id", controller.deleteProduct);

module.exports = router;
