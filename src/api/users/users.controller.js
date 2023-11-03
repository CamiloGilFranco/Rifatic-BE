const users = require("./users.model");

module.exports = {
  async findAllUsers(req, res) {
    try {
      const { user } = req;

      if (user.role !== "admin") {
        throw new Error("operation not allowed");
      }

      const usersFound = await users
        .find()
        .populate({ path: "giveaways", select: "-user" });

      res.status(200).json({
        message: "user found",
        usersFound,
      });
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
      const { user } = req;

      const userFound = await users
        .findById(user.id)
        .populate({ path: "giveaways", select: "-user" });

      res.status(200).json({
        message: "user found",
        userData: {
          name: userFound.name,
          last_name: userFound.last_name,
          phone: userFound.phone,
          state: userFound.state,
          role: userFound.role,
          email: userFound.email,
          giveaways: userFound.giveaways,
        },
      });
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
