const router = require("express").Router();
const {
  createProduct,
  getAllMenu,
  getProductById,
  updateProduct,
  deleteProduct,
  getfilteredProducts,
} = require("../controllers/products");
router.post("/add", createProduct);
router.get("/menu", getAllMenu);
router.get("/menu/:id", getProductById);
router.put("/menu/:id", updateProduct);
router.delete("/menu/:id", deleteProduct);
router.get("/", getfilteredProducts);
module.exports = router;
