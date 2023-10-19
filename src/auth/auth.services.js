const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require("../api/users/users.model");

const key = process.env.SECRET_KEY;

const signToken = (payload) => {
  const token = jwt.sign(payload, key);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, key);

    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const login = (email) => {
  return users.findOne({ email });
};

module.exports.signToken = signToken;
module.exports.verifyToken = verifyToken;
module.exports.login = login;
