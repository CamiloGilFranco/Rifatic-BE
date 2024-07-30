const giveaways = require("../giveaways/giveaways.model");
const users = require("../users/users.model");
const soldTickets = require("./sold_tickets.model");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  async sellTickets(req, res) {
    try {
      if (req.user.state === "inactive") {
        throw new Error("user disabled ");
      }

      const userRaffle = await users.findOne({
        _id: new ObjectId(req.user.id), // Verifica que el documento corresponde al usuario autenticado
        giveaways: { $in: [new ObjectId(req.body.raffle_id)] }, // Verifica que el raffle_id está en el array de giveaways
      });

      if (!userRaffle) {
        throw new Error("No matching raffle found for this user.");
      }

      const existingTickets = await soldTickets.find({
        giveaway: new ObjectId(req.body.raffle_id),
        selected_number: { $in: req.body.selectedNumbers },
      });

      if (existingTickets.length > 0) {
        return res.status(400).json({
          message: "Some tickets are already sold",
          soldNumbers: existingTickets.map((ticket) => ticket.selected_number),
        });
      }

      const giveaway = await giveaways.findById(req.body.raffle_id);

      const recordsList = req.body.selectedNumbers.map((number) => {
        return {
          full_name: req.body.buyerName,
          phone_number: req.body.buyerPhone,
          email: req.body.buyerEmail,
          selected_number: number,
          giveaway: req.body.raffle_id,
        };
      });

      const soldNumbers = await soldTickets.insertMany(recordsList);

      giveaway.sold_tickets.unshift(...soldNumbers.map((ticket) => ticket._id));
      await giveaway.save();

      res.status(200).json({
        message: "tickets sold",
        response: soldNumbers,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "numbers couldn't be sold",
        data: error.message,
      });
    }
  },

  async releaseTicket(req, res) {
    try {
      if (req.user.state === "inactive") {
        throw new Error("user disabled ");
      }

      const userRaffle = await users.findOne({
        _id: new ObjectId(req.user.id), // Verifica que el documento corresponde al usuario autenticado
        giveaways: { $in: [new ObjectId(req.body.raffle_id)] }, // Verifica que el raffle_id está en el array de giveaways
      });

      if (!userRaffle) {
        throw new Error("No matching raffle found for this user.");
      }

      const existingTicket = await soldTickets.findOne({
        giveaway: new ObjectId(req.body.raffle_id),
        selected_number: { $in: req.body.selected_number.number },
      });

      if (!existingTicket) {
        return res.status(400).json({
          message: "The ticket has not been sold",
        });
      }

      const deletedTicket = await soldTickets.deleteOne({
        _id: existingTicket._id,
      });

      if (deletedTicket.deletedCount === 0) {
        return res.status(400).json({
          message: "No ticket was deleted",
        });
      }

      res.status(200).json({
        message: "tickets released",
        deleted_data: existingTicket,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "ticket couldn't be released",
        data: error.message,
      });
    }
  },
};
