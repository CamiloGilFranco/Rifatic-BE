const healthcheck = require("./api/healthcheck/healthcheck");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
};

module.exports = routes;
