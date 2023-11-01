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
      if (req.user.role !== "admin") {
        throw new Error("operation not allowed");
      }

      const { id } = req.query;
      const data = await donations.findOne({ _id: id });

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
      if (req.user.role !== "admin") {
        throw new Error("operation not allowed");
      }

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
