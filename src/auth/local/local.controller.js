const bcrypt = require("bcrypt");
const users = require("../../api/users/users.model");
const { signToken, login } = require("../auth.services");
const generarId = require("../../helpers/RandomID");

newUserController = async (req, res) => {
  try {
    const { name, last_name, phone, email, password } = req.body;

    const encPassword = await bcrypt.hash(password, 10);

    const state = "not validated";
    const role = "regular user";
    const secureCode = generarId();

    const user = await users.create({
      name,
      last_name,
      phone,
      email,
      password: encPassword,
      state,
      role,
      secure_code: secureCode,
    });

    setTimeout(async () => {
      const createdUser = await users.findById(user._id);
      if (createdUser.state === "not validated") {
        await users.findByIdAndDelete(user._id);
      }
      console.log("end");
    }, 300000);

    res.status(201).json({
      message: "User created",
      code: secureCode,
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

    console.log(user);

    const token = signToken({
      id: user.id,
      state: user.state,
      role: user.role,
    });

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
