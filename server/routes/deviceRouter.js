const Router = require("express");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const DeviceController = require("../controllers/deviceController");
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);

module.exports = router;
