const fs = require("fs");
const {
  getTotalSales,
  getDiscount,
  getQuantity,
  getProfit,
} = require("../utils");

exports.stateList = async (req, res) => {
  try {
    fs.readFile("./public/sales.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const stateswithOrderDates = JSON.parse(data).reduce((acc, item) => {
        if (!acc[item["State"]]) {
          acc[item["State"]] = [];
        }

        acc[item["State"]].push(new Date(item["Order Date"]));
        return acc;
      }, {});

      const stateMinMaxDate = {};
      for (const state in stateswithOrderDates) {
        const minDate = new Date(Math.min(...stateswithOrderDates[state]));
        const maxDate = new Date(Math.max(...stateswithOrderDates[state]));
        stateMinMaxDate[state] = {
          minDate: minDate.toISOString().split("T")[0],
          maxDate: maxDate.toISOString().split("T")[0],
        };
      }
      return res.status(200).json(stateMinMaxDate);
    });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.dashboardData = async (req, res) => {
  try {
    console.log(req.query);
    const { state, fromDate, toDate } = req.query;
    fs.readFile("./public/sales.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      const parsedData = JSON.parse(data);
      const items = parsedData.filter((item) => {
        const itemDate = item["Order Date"];
        return (
          item["State"] === state && itemDate >= fromDate && itemDate <= toDate
        );
      });
      const totalSales = getTotalSales(items);
      const quantity = getQuantity(items);
      const discount = getDiscount(items);
      const profit = getProfit(items);
      return res
        .status(200)
        .json({ items, totalSales, discount, profit, quantity });
    });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
