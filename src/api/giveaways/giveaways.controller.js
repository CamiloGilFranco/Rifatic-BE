const giveaways = require("./giveaways.model");
const users = require("../users/users.model");

module.exports = {
  async createGiveaway(req, res) {
    try {
      const { title, description, image, draw_date, lottery } = req.body;

      const ticket_price = parseInt(req.body.ticket_price);
      const number_of_digits = parseInt(req.body.number_of_digits);

      if (req.user.state === "inactive") {
        throw new Error("user disabled ");
      }

      /*       if (req.user.role==="admin") {
        throw new Error("admins can't create giveaways");
      }*/

      const user = await users.findById(req.user.id);

      if (!user) {
        throw new Error("user not found");
      }

      const newGiveaway = await giveaways.create({
        title,
        description,
        image,
        type: "raffle",
        draw_date,
        ticket_price,
        number_of_digits,
        lottery,
        state: "in progress",
        user: req.user.id,
      });

      user.giveaways.unshift(newGiveaway);
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "giveaway created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be created",
        data: error.message,
      });
    }
  },

  async findOneGiveaway(req, res) {
    try {
      const { id } = req.query;

      const giveawayData = await giveaways
        .findById(id)
        .populate({ path: "user", select: "name last_name phone -_id" });

      res.status(200).json({
        message: "giveaway found",
        giveawayData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be found",
        data: error.message,
      });
    }
  },

  async findAllGiveaways(req, res) {
    try {
      const allGiveaways = await giveaways.find();

      res.status(200).json({
        message: "giveaways found",
        data: allGiveaways,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaways couldn't be found",
        data: error.message,
      });
    }
  },

  async findAllActiveGiveaways(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaways couldn't be found",
        data: error.message,
      });
    }
  },

  async updateStateGiveaway(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be updated",
        data: error.message,
      });
    }
  },
};
