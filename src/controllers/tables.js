const { tables, orders, products } = require("../services/database");

const buildBill = (table, order) => {
  const items = order.items.map((item) => {
    const product = products.get(item.productId);
    const name = product ? product.name : "Unknown product";
    const price = product ? product.price : 0;
    const total = price * item.quantity;
    return { name, price, quantity: item.quantity, total };
  });
  const total = items.reduce((sum, item) => sum + item.total, 0);
  return { table: table.number, items, total };
};

const getAllTables = (req, res) => {
  try {
    const { status } = req.query;
    const allTables = Array.from(tables.values()).filter(
      (table) => status === undefined || table.status === status,
    );
    res.status(200).json(allTables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTableById = (req, res) => {
  try {
    const { id } = req.params;
    const table = tables.get(parseInt(id));
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    console.error("Error fetching table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const openTable = (req, res) => {
  try {
    const { id } = req.params;
    const table = tables.get(parseInt(id));
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    if (table.status === "occupied") {
      return res.status(409).json({ error: "Table is already occupied" });
    }

    const orderId = orders.size + 1 + Date.now();
    const newOrder = {
      id: orderId,
      tableId: table.id,
      items: [],
      status: "open",
    };
    orders.set(orderId, newOrder);

    table.status = "occupied";
    table.currentOrderId = orderId;

    console.log(`Table ${table.number} opened with order ${orderId}`);
    res.status(201).json({ table, order: newOrder });
  } catch (error) {
    console.error("Error opening table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBill = (req, res) => {
  try {
    const { id } = req.params;
    const table = tables.get(parseInt(id));
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    const order = orders.get(table.currentOrderId);
    if (!order || order.status !== "open") {
      return res.status(404).json({ error: "Table has no active order" });
    }

    res.status(200).json(buildBill(table, order));
  } catch (error) {
    console.error("Error fetching bill:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const closeTable = (req, res) => {
  try {
    const { id } = req.params;
    const table = tables.get(parseInt(id));
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    if (table.status !== "occupied") {
      return res.status(409).json({ error: "Table is not occupied" });
    }

    const order = orders.get(table.currentOrderId);
    if (!order) {
      return res
        .status(500)
        .json({ error: "Active order not found for table" });
    }

    const { total } = buildBill(table, order);
    order.status = "completed";
    table.status = "available";
    table.currentOrderId = null;

    console.log(`Table ${table.number} closed. Total: ${total}`);
    res.status(200).json({ message: "Table closed successfully", total });
  } catch (error) {
    console.error("Error closing table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTables,
  getTableById,
  openTable,
  getBill,
  closeTable,
};
