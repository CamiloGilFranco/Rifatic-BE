const healthcheck = require("./api/healthcheck/healthcheck");
const authLocal = require("./auth/local/local");
const donations = require("./api/donations/donations");
const giveaways = require("./api/giveaways/giveaways");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/local", authLocal);
  app.use("/api/donations", donations);
  app.use("/api/giveaways", giveaways);
};

module.exports = routes;
