const { Schema, model } = require("mongoose");

const reportsSchema = new Schema(
  {
    reporter_name: { type: String, required: true },
    reporter_email: { type: String, required: true },
    description: { type: String, required: true },
    report_state: { type: String, required: true },
    response: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const reports = model("reports", reportsSchema);

module.exports = reports;
