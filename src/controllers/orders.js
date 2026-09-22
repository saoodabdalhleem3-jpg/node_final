const { orders, products } = require("../services/database");

// products.js doesn't coerce "available" to a real boolean (it stores
// whatever the client sent), so accept either the boolean or the string form.
const isProductAvailable = (product) =>
  product.available === true || product.available === "true";

const addItemToOrder = (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    const order = orders.get(parseInt(id));
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "open") {
      return res.status(409).json({ error: "Order is not open" });
    }

    const product = products.get(parseInt(productId));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (!isProductAvailable(product)) {
      return res.status(409).json({ error: "Product is not available" });
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive integer" });
    }

    const existingItem = order.items.find((item) => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += parsedQuantity;
    } else {
      order.items.push({ productId: product.id, quantity: parsedQuantity });
    }

    console.log(`Added ${parsedQuantity} x product ${product.id} to order ${order.id}`);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error adding item to order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addItemToOrder,
};
