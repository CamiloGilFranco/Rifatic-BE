const { Router } = require("express");
const {
  newUserController,
  loginController,
  verifyNewUser,
} = require("./local.controller");

const router = Router();

router.post("/new-user", newUserController);
router.post("/login", loginController);
router.put("/verify", verifyNewUser);

module.exports = router;
