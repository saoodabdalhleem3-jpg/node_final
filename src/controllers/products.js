const { products } = require("../services/database");
const createProduct = (req, res) => {
  try {
    const { name, price, category, available } = req.body;
    const id = products.size + 1 + Date.now(); // Generate a new ID based on the current size of the products map
    const newProduct = { id, name, price, category, available };
    products.set(id, newProduct);
    console.log(`Product created: ${JSON.stringify(newProduct)}`);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllMenu = (req, res) => {
  try {
    const allProducts = Array.from(products.values());
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.get(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, available } = req.body;
    const product = products.get(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    Object.assign(product, { name, price, category, available });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.get(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    products.delete(parseInt(id));
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getfilteredProducts = (req, res) => {
  try {
    const { category, available } = req.query;
    const hasAvailableFilter = available !== undefined;

    const filteredProducts = Array.from(products.values()).filter((product) => {
      const categoryMatches =
        category === undefined || product.category === category;
      // product.available may be stored as a boolean or a string depending on
      // what the client sent when creating it, so compare on string form.
      const availableMatches =
        !hasAvailableFilter || String(product.available) === available;
      return categoryMatches && availableMatches;
    });

    console.log(
      `Products filtered by category "${category}" and availability "${available}": ${JSON.stringify(filteredProducts)}`,
    );
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createProduct,
  getAllMenu,
  getProductById,
  updateProduct,
  deleteProduct,
  getfilteredProducts,
};
