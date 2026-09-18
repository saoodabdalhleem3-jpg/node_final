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
  status: "available"
}
*/
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
