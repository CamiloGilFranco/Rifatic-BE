const Router = require("express");
const { auth } = require("../../middlewares/auth");
const usersController = require("./users.controller");

const router = Router();

router.get("/", auth, usersController.findAllUsers);
router.get("/path", auth, usersController.findUserByPath);
router.put("/deactivate", auth, usersController.deactivateUser);
router.put("/reactivate", auth, usersController.reactivateUser);
router.put("/data", auth, usersController.updatePersonalData);
router.put("/role", auth, usersController.changeUserRole);

module.exports = router;
