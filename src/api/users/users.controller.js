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
        message: "users found",
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

  async findUserByPath(req, res) {
    try {
      const { user } = req;
      const { path } = req.query;

      const userFound = await users.findById(user.id);

      if (userFound.path !== path) {
        throw new Error("operation not allowed");
      }

      const userData = await users
        .findOne({ path })
        .populate({ path: "giveaways", select: "-user" });

      res.status(200).json({
        message: "user found",
        userData: {
          name: userData.name,
          last_name: userData.last_name,
          phone: userData.phone,
          state: userData.state,
          role: userData.role,
          email: userData.email,
          giveaways: userData.giveaways,
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
      const { user } = req;
      const { email } = req.body;

      const userFound = await users.findOne({ email });

      if (user.role !== "admin" && user.id !== userFound._id.toString()) {
        throw new Error("operation not allowed");
      }

      const deactivatedUser = await users
        .findOneAndUpdate({ email }, { state: "disabled" }, { new: true })
        .populate({ path: "giveaways", select: "-user" });

      res.status(200).json({
        message: "user deactivated",
        deactivatedUser,
      });
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
      const { user } = req;
      const { email } = req.body;

      if (user.role !== "admin") {
        throw new Error("operation not allowed");
      }

      const reactivatedUser = await users
        .findOneAndUpdate({ email }, { state: "active" }, { new: true })
        .populate({ path: "giveaways", select: "-user" });

      res.status(200).json({
        message: "user reactivated",
        reactivatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user couldn't be reactivated",
        data: error.message,
      });
    }
  },

  async changeUserRole(req, res) {
    try {
      res.status(200).json({
        message: "user updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "user role couldn't be updated",
        data: error.message,
      });
    }
  },

  async updatePersonalData(req, res) {
    try {
      res.status(200).json({
        message: "user updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "personal data couldn't be updated",
        data: error.message,
      });
    }
  },

  async updatePassword(req, res) {
    try {
      res.status(200).json({
        message: "password updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "password couldn't be updated",
        data: error.message,
      });
    }
  },
};
