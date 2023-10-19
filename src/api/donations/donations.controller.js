const donations = require("./donations.model");

module.exports = {
  async createDonation(req, res) {
    try {
      await donations.create(req.body);

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
      const { coupon } = req.query;
      const data = await donations.find({ _id: coupon });

      res.status(200).json({
        message: "donation found",
        data,
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
      const allDonations = await donations.find();

      res.status(200).json({
        message: "donations found",
        data: allDonations,
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
