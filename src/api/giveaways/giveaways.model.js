const { Schema, model } = require("mongoose");

const giveawaysSchema = new Schema({
  raffle_type: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  lottery: { type: String },
  draw_date: { type: Date },
  number_of_digits: { type: String },
  ticket_price: { type: String },
  show_phone: { type: Boolean },
  social_media_url: { type: String },
  winners_number: { type: Number },
  substitutes_number: { type: Number },
  comment_content: { type: String },
  limit_date: { type: String },
  multiple_participations: { type: Boolean },
  validate_follows: { type: String },
  mentions_number: { type: Number },
  //list_type: { type: String },
  //participants_list: { type: Array },
  //sweeten: { type: Boolean },
  //sweeten_frequency: { type: String },
  //minimum_price: { type: String },
  organizer_name: { type: String },
  created_at: { type: Date, default: Date.now, required: true },
  state: { type: String, required: true },
  winning_number: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  sold_tickets: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "soldTickets",
      },
    ],
    required: false,
  },
});

const giveaways = model("giveaways", giveawaysSchema);

module.exports = giveaways;
