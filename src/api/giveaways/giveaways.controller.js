const giveaways = require("./giveaways.model");
const users = require("../users/users.model");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  //#region  createGiveaway
  async createGiveaway(req, res) {
    try {
      const { title, description, image, draw_date, lottery, show_phone } =
        req.body;

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
        show_phone,
        state: "in progress",
        user: req.user.id,
      });

      user.giveaways.unshift(newGiveaway);
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        message: "giveaway created",
        newGiveaway,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be created",
        data: error.message,
      });
    }
  },

  //#region  findOneGiveaway
  async findOneGiveaway(req, res) {
    try {
      const { id } = req.query;

      const giveawayData = await giveaways
        .findById(id)
        .populate({ path: "user", select: "name last_name phone -_id" })
        .populate({
          path: "sold_tickets",
          select: "full_name phone_number email selected_number -_id",
        });

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

  //#region  findAllGiveaway
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

  //#region findAllGiveawaysPerUser
  async findAllGiveawaysPerUser(req, res) {
    try {
      if (req.user.state === "inactive") {
        throw new Error("user disabled ");
      }

      const allGiveaways = await giveaways.find({ user: req.user.id });

      res.status(200).json({
        message: "giveaways found",
        giveaways: allGiveaways,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaways couldn't be found",
        data: error.message,
      });
    }
  },

  //#region updateStateGiveaway
  async updateStateGiveaway(req, res) {
    try {
      const { id, state } = req.body;
      const { user } = req;

      const giveaway = await giveaways.findById(id);

      if (user.role !== "admin" && user.id !== giveaway.user.toString()) {
        throw new Error("operation not allowed");
      }

      const updatedGiveaway = await giveaways.findByIdAndUpdate(
        id,
        { state },
        { new: true }
      );

      res.status(200).json({
        message: "giveaway updated",
        updatedGiveaway,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be updated",
        data: error.message,
      });
    }
  },

  //#region finishGiveaway
  async finishGiveaway(req, res) {
    try {
      const { lottery, draw_date, winning_number } = req.body;
      const { user } = req;

      if (user.role !== "admin") {
        throw new Error("operation not allowed");
      }

      const participatingGiveaway = await giveaways.find({
        lottery,
        draw_date,
      });

      participatingGiveaway.map(async (giveaway) => {
        const numberOfDigits = parseInt(giveaway.number_of_digits);

        const winningNumber = winning_number.slice(-numberOfDigits);

        const updatedGiveaway = await giveaways.findByIdAndUpdate(
          giveaway.id,
          { state: "finished", winning_number: winningNumber },
          { new: true }
        );
      });

      res.status(200).json({
        message: "giveaway updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be updated",
        data: error.message,
      });
    }
  },

  //#region cancelGiveaway
  async cancelGiveaway(req, res) {
    try {
      if (req.user.state === "inactive") {
        return res.status(403).json({ message: "User disabled." });
      }

      const raffleId = req.body.raffle_id;
      if (!raffleId) {
        return res.status(400).json({ message: "Raffle ID is required." });
      }

      const objectRaffleId = new ObjectId(raffleId);

      const userRaffle = await users.findOne({
        _id: new ObjectId(req.user.id), // Verifica que el documento corresponde al usuario autenticado
        giveaways: { $in: [objectRaffleId] }, // Verifica que el raffle_id está en el array de giveaways
      });

      if (!userRaffle) {
        return res.status(404).json({
          message: "No matching raffle found for this user.",
        });
      }

      const raffleData = await giveaways.findOne({ _id: objectRaffleId });

      if (raffleData.sold_tickets.length > 0) {
        return res.status(400).json({
          message: "You cannot delete raffles with assigned tickets.",
        });
      }

      // Iniciar una transacción para eliminar la rifa y actualizar el usuario
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const canceledRaffle = await giveaways.deleteOne(
          { _id: objectRaffleId },
          { session }
        );

        if (canceledRaffle.deletedCount === 0) {
          await session.abortTransaction();
          return res.status(400).json({ message: "No raffle was canceled." });
        }

        // Actualizar el documento del usuario
        await users.updateOne(
          { _id: new ObjectId(userRaffle._id) },
          { $pull: { giveaways: raffleId } },
          { session }
        );

        // Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Giveaway canceled successfully." });
      } catch (error) {
        await session.abortTransaction();

        session.endSession();

        throw error;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "giveaway couldn't be updated",
        data: error.message,
      });
    }
  },
};
