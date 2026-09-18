const router = require("express").Router();
const {
  createProduct,
  getAllMenu,
  getProductById,
  updateProduct,
} = require("../controllers/products");
router.post("/add", createProduct);
router.get("/menu", getAllMenu);
router.get("/menu/:id", getProductById);
router.put("/menu/:id", updateProduct);
module.exports = router;
