const Router = require("express");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const BrandController = require("../controllers/brandController");
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), BrandController.create);
router.get("/", BrandController.getAll);

module.exports = router;
