const healthcheck = require("./api/healthcheck/healthcheck");
const authLocal = require("./auth/local/local");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/local", authLocal);
};

module.exports = routes;
