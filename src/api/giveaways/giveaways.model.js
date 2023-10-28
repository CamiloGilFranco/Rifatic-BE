const { Schema, model, models } = require("mongoose");

const giveawaysSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  type: { type: String, required: true },
  raffler: { type: String, required: true },
  draw_date: { type: String, required: true },
  ticket_price: { type: String },
  number_of_digits: { type: String },
  tickets_sold: { type: String },
  lottery: { type: String },
  state: { type: String, required: true },
  winning_number: { type: String },
});

const giveaways = model("giveaways", giveawaysSchema);

module.exports = giveaways;
