const healthcheck = require("./api/healthcheck/healthcheck");
const authLocal = require("./auth/local/local");
const donations = require("./api/donations/donations");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/local", authLocal);
  app.use("/api/donations", donations);
};

module.exports = routes;
