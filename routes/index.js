// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// router.get("/state-list", async function (req, res, next) {
//   // res.send('respond with a resource');
//   const jsonData = await fs.readFile("data.json", "utf8");
//   const parsedData = JSON.parse(jsonData);
//   console.log(jsonData);
//   const states = parsedData.map((data) => data["State"]);
//   res.status(200).json({ states });
// });

// module.exports = router;

module.exports = function (app) {
  console.log("111111111111111111111111111");
  require("./api")(app);
};
