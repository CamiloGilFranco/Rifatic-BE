const users = require("./users.model");

module.exports = {
  async findAllUsers(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "users couldn't be found",
        data: error.message,
      });
    }
  },

  async findOneUser(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user couldn't be found",
        data: error.message,
      });
    }
  },

  async deactivateUser(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user couldn't be deactivated",
        data: error.message,
      });
    }
  },

  async reactivateUser(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user couldn't be reactivated",
        data: error.message,
      });
    }
  },

  async updatePersonalData(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "personal data couldn't be updated",
        data: error.message,
      });
    }
  },

  async changeUserRole(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user role couldn't be updated",
        data: error.message,
      });
    }
  },
};
