const products = new Map();
/*

  id: ,
  name: "",
  price: ,
  category: "",
  available: 
}

*/
//--------------------------------------------------------------------//
const tables = new Map();
/*
{
  id: 1,
  number: 1,
  seats: 4,
  status: "available",
  currentOrderId: null // id of the open order for this table, if any
}
*/
// The spec has no endpoint for creating tables, so seed a starting set here.
[
  { id: 1, number: 1, seats: 2, status: "available", currentOrderId: null },
  { id: 2, number: 2, seats: 4, status: "available", currentOrderId: null },
  { id: 3, number: 3, seats: 4, status: "available", currentOrderId: null },
  { id: 4, number: 4, seats: 6, status: "available", currentOrderId: null },
  { id: 5, number: 5, seats: 2, status: "available", currentOrderId: null },
].forEach((table) => tables.set(table.id, table));
//--------------------------------------------------------------------//
const orders = new Map();
/*
{
  id: 101,
  tableId: 1,
  items: [],
  status: "open"
}
*/
module.exports = {
  products,
  tables,
  orders,
};
