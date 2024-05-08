const healthcheck = require("./api/healthcheck/healthcheck");
const authLocal = require("./auth/local/local");
const donations = require("./api/donations/donations");
const giveaways = require("./api/giveaways/giveaways");
const users = require("./api/users/users");
const soldTickets = require("./api/sold_tickets/sold_tickets");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/local", authLocal);
  app.use("/api/donations", donations);
  app.use("/api/giveaways", giveaways);
  app.use("/api/users", users);
  app.use("/api/sold_tickets", soldTickets);
};

module.exports = routes;
