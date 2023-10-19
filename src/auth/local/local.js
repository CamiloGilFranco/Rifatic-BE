const { Router } = require("express");
const { newUserController, loginController } = require("./local.controller");
const { auth } = require("../../middlewares/auth");

const router = Router();

router.post("/new-user", newUserController);
router.post("/login", loginController);

module.exports = router;
