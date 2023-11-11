const Router = require("express");
const { auth } = require("../../middlewares/auth");
const giveawaysController = require("./giveaways.controller");
const { formData } = require("../../middlewares/formData");

const router = Router();

router.post("/", auth, formData, giveawaysController.createGiveaway);
router.get("/", giveawaysController.findAllGiveaways);
router.get("/single", giveawaysController.findOneGiveaway);
router.put("/state", auth, giveawaysController.updateStateGiveaway);
router.put("/finish", auth, giveawaysController.finishGiveaway);

module.exports = router;
