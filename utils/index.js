exports.getTotalSales = (items) => {
  const totalSales = items.reduce((acc, cur) => acc + cur["Sales"], 0);
  return Math.floor(totalSales);
};

exports.getQuantity = (items) => {
  return items.reduce((acc, cur) => acc + cur["Quantity"], 0);
};

exports.getDiscount = (items) => {
  const discount = items.reduce((acc, cur) => acc + cur["Discount"], 0);
  return parseFloat(discount.toFixed(2));
};

exports.getProfit = (items) => {
  const profit = items.reduce((acc, cur) => acc + cur["Profit"], 0);
  return Math.floor(profit);
};
