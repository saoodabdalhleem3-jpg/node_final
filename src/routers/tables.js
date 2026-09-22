const router = require("express").Router();
const {
  getAllTables,
  getTableById,
  openTable,
  getBill,
  closeTable,
} = require("../controllers/tables");

router.get("/", getAllTables);
router.get("/:id/bill", getBill);
router.get("/:id", getTableById);
router.post("/:id/open", openTable);
router.post("/:id/close", closeTable);

module.exports = router;
