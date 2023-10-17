const { verifyToken } = require("../auth/auth.services");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Su sesión expiro");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Su sesión expiro");
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      throw new Error("Invalid token, please log in again");
    }

    const { id } = verifyToken(token);

    req.user = id;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports.auth = auth;
