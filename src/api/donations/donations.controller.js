const donations = require("./donations.model");

module.exports = {
  async createDonation(req, res) {
    try {
      //
      res.status(200).json({
        message: "donation created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "donation couldn't be created",
        data: error.message,
      });
    }
  },

  async findDonation(req, res) {
    try {
      //
      res.status(200).json({
        message: "donation found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "donation couldn't be found",
        data: error.message,
      });
    }
  },

  async findAllDonation(req, res) {
    try {
      //
      res.status(200).json({
        message: "donations found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "donations couldn't be found",
        data: error.message,
      });
    }
  },
};
