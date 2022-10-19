const Router = require("express");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const BasketController = require("../controllers/basketController");
const router = new Router();

router.get("/", checkRoleMiddleware("ADMIN"), BasketController.getAll);

module.exports = router;
