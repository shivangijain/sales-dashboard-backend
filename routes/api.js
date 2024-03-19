const dashboardController = require("../controller/dashboardController");

module.exports = function (app) {
  console.log("2222222222222222222222222");
  app.route("/api/state-list").get(dashboardController.stateList);
  app.route("/api/dashboard-data").get(dashboardController.dashboardData);
};
