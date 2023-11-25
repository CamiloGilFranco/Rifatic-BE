const { Schema, model } = require("mongoose");

const problems_and_commentsSchema = new Schema({
  comment: { type: String, required: true },
  response: { type: String, required: true },
  answered: { type: Boolean },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const problems_and_comments = model(
  "problems_and_comments",
  problems_and_commentsSchema
);

module.exports = problems_and_comments;
