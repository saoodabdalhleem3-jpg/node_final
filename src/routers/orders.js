const router = require("express").Router();
const { addItemToOrder } = require("../controllers/orders");

router.post("/:id/items", addItemToOrder);

module.exports = router;
