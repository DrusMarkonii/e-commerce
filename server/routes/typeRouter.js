const Router = require("express");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const TypeController = require("../controllers/typeController");
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);

module.exports = router;
