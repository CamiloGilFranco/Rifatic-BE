const Router = require("express");
const { auth } = require("../../middlewares/auth");
const donationsController = require("./donations.controller");

const router = Router();

router.post("/", donationsController.createDonation);
router.get("/", auth, donationsController.findAllDonation);
router.get("/single", auth, donationsController.findDonation);

module.exports = router;
