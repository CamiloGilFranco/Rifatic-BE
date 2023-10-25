const bcrypt = require("bcrypt");
const users = require("../../api/users/users.model");
const { signToken, login, verifyToken } = require("../auth.services");
const generarId = require("../../helpers/RandomID");
const { sendNodeMailer } = require("../../config/nodemailer");
const { verifyUserEmail } = require("../../utils/emails");

const key = process.env.SECRET_KEY;

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
      path: secureCode,
      secure_code: secureCode.slice(-6),
    });

    await sendNodeMailer(verifyUserEmail({ name, email, secureCode }));

    setTimeout(async () => {
      const createdUser = await users.findById(user._id);
      if (createdUser.state === "not validated") {
        await users.findByIdAndDelete(user._id);
      }
    }, 300000);

    const token = signToken({ id: user._id }, key);

    res.status(201).json({
      message: "User created",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const verifyNewUser = async (req, res) => {
  try {
    const { token, verificationCode } = req.body;
    const decoded = verifyToken(token);

    const user = await users.findById(decoded.id);

    if (!user) {
      throw new Error(
        "El código de verificación expiró, debes registrarte de nuevo"
      );
    }

    if (user.secure_code !== verificationCode) {
      throw new Error("El código de verificación es incorrecto");
    }

    await users.findByIdAndUpdate(decoded.id, {
      secure_code: "",
      state: "active",
    });

    res.status(201).json({
      message: "User verified",
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

    const token = signToken({
      id: user.id,
      state: user.state,
      role: user.role,
    });

    res.status(201).json({
      message: "User found",
      data: { token, email, role: user.role, path: user.path },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.newUserController = newUserController;
module.exports.verifyNewUser = verifyNewUser;
module.exports.loginController = loginController;
