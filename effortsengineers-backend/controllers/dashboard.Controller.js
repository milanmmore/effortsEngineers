// Example Dashboard Controller (ESM)

export const getOrdersOverview = (req, res) => {
  // Replace with real DB query
  res.json({
    totalOrders: 42,
    pendingOrders: 10,
    completedOrders: 32,
  });
};

export const getInventoryLevels = (req, res) => {
  // Replace with real DB query
  res.json({
    itemsLowStock: 5,
    itemsInStock: 120,
  });
};

export const getSalesForecast = (req, res) => {
  // Replace with real analytics
  res.json({
    forecast: "Sales expected to grow 15% next quarter",
  });
};
