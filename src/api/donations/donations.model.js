const { Schema, model } = require("mongoose");

const donationsSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    value: { type: Number, required: true },
    message: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const donations = model("donations", donationsSchema);

module.exports = donations;
