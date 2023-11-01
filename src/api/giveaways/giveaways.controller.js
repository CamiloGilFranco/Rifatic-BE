const giveaways = require("./giveaways.model");

module.exports = {
  async findOneGiveaway(req, res) {
    try {
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

  async createGiveaway(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be created",
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
