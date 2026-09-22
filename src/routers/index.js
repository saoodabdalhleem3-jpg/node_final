const router = require("express").Router();

router.use("/products", require("./products"));
router.use("/tables", require("./tables"));
router.use("/orders", require("./orders"));
module.exports = router;
