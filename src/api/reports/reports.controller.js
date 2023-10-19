const reports = require("./reports.model");

module.exports = {
  async createReport(req, res) {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "report couldn't be created",
        data: error.message,
      });
    }
  },

  async findAllReport(req, res) {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "reports couldn't be found",
        data: error.message,
      });
    }
  },

  async findSingleReport(req, res) {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "report couldn't be found",
        data: error.message,
      });
    }
  },

  async resolveReport(req, res) {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "report couldn't be answered",
        data: error.message,
      });
    }
  },

  async deleteReport(req, res) {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "report couldn't be answered",
        data: error.message,
      });
    }
  },
};
