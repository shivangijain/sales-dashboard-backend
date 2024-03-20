const dashboardController = require("../controller/dashboardController");

module.exports = function (app) {
  app.route("/api/state-list").get(dashboardController.stateList);
  app.route("/api/dashboard-data").get(dashboardController.dashboardData);
};
