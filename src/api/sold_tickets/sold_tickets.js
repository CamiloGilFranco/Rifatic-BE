const Router = require("express");
const { auth } = require("../../middlewares/auth");
const { formData } = require("../../middlewares/formData");
const soldTicketsController = require("./sold_tickets.controller");

const router = Router();

router.post("/", auth, soldTicketsController.sellTickets);

module.exports = router;
