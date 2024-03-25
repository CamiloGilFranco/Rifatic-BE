const { Schema, model } = require("mongoose");

const soldTicketsSchema = new Schema({
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  selected_number: { type: String, required: true },
  giveaway: {
    type: Schema.Types.ObjectId,
    ref: "giveaways",
    required: true,
  },
});

const soldTickets = model("soldTickets", soldTicketsSchema);

module.exports = soldTickets;
