const mongoose = require("mongoose");
require("dotenv");

const connect = async () => {
  const uri = process.env.MONGO_URI;

  mongoose.connect(uri);

  mongoose.connection.once("open", () => {
    console.log("connection with mongo ok");
  });

  mongoose.connection.on("error", (error) => {
    console.log("something wont wrong", error);
  });
};

module.exports = { connect };
