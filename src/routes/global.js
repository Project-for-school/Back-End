const router = require("express").Router();

const { globalController } = require("../controllers");

router.get("/", globalController.getAllData); // lấy tất cả data

router.get("/:id", globalController.getData); // lấy data theo ID

router.post("/post", globalController.postData); // viết data

router.put("/repair/:id", globalController.repairData); // sửa data theo ID

router.delete("/delete/:id", globalController.deleteData); // xóa data theo ID

module.exports = router;
