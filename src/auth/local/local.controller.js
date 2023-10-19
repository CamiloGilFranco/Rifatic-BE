const bcrypt = require("bcrypt");
const users = require("../../api/users/users.model");
const { signToken, login } = require("../auth.services");

newUserController = async (req, res) => {
  try {
    const { name, last_name, phone, email, password } = req.body;

    const encPassword = await bcrypt.hash(password, 10);

    const state = "active";
    const role = "regular user";

    const user = await users.create({
      name,
      last_name,
      phone,
      email,
      password: encPassword,
      state,
      role,
    });

    const token = signToken({ id: user._id });

    res.status(201).json({
      message: "User created",
      data: { email, name, last_name, phone, state, role, token },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email);

    if (!user) {
      throw new Error("Email o contraseña invalida");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Email o contraseña incorrecta");
    }

    const token = signToken({ id: user.id });

    res.status(201).json({
      message: "User found",
      data: { token },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.newUserController = newUserController;
module.exports.loginController = loginController;
