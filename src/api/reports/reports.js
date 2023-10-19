const Router = require("express");
const { auth } = require("../../middlewares/auth");
const donationsController = require("./reports.controller");

const router = Router();

router.post("/", donationsController.createReport);
router.get("/", auth, donationsController.findAllReport);
router.get("/single", auth, donationsController.findSingleReport);
router.put("/resolve", auth, donationsController.resolveReport);
router.delete("/resolve", auth, donationsController.deleteReport);

module.exports = router;
