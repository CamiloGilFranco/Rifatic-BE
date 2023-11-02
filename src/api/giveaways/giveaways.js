const Router = require("express");
const { auth } = require("../../middlewares/auth");
const giveawaysController = require("./giveaways.controller");

const router = Router();

router.post("/", auth, giveawaysController.createGiveaway);
router.get("/active", giveawaysController.findAllActiveGiveaways);
router.get("/", giveawaysController.findAllGiveaways);
router.get("/single", giveawaysController.findOneGiveaway);
router.put("/state", auth, giveawaysController.updateStateGiveaway);

module.exports = router;
