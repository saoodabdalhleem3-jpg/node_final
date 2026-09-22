Restaurant Management System – Restaurant Management API
Purpose of the assignment

In this task, the Backend server will be opened for restaurant management via Node.js.

The system will enable the management of products/dishes, tables and orders, from seating customers at the table to calculating the account and closing the table.

The system is a server only. There is no need to develop a client side and no database should be used.

All data will be saved in memory using objects Map.

The API test will be done using Postman.

1. System structure

You need to manage at least three collections:

const products = new Map();
const tables = new Map();
const orders = new Map();

Products

Represents the dishes and products that can be ordered in the restaurant.

Example:

{
id: 1,
name: "Pizza",
price: 45,
category: "Main",
available: true
}

Tables

Represents the tables in the restaurant.

Example:

{
id: 1,
number: 1,
seats: 4,
status: "available"
}

Table status can be:

available
occupied

Orders

Represents an active order or order that has ended.

Example:

{
id: 101,
tableId: 1,
items: [],
status: "open"
}

2. Product Management

An API must be implemented that allows CRUD operations to be performed on the restaurant's products.

GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

Product creation

For example:

POST /products

Body:

{
"name": "Pizza",
"price": 45,
"category": "Main",
"available": true
}

Health checks for the data received.

For example, do not allow the creation of a product without a name or a proper price. 3. Product Search and Filter

Product filtering should be allowed using Query Parameters.

For example:

GET /products?category=Main

Return only products belonging to the requested category.

In addition:

GET /products?available=true

Return only products available for order. 4. Table Management

You must be allowed to receive a list of tables:

GET /tables

Get a particular table:

GET /tables/:id

Filtering by status:

GET /tables?status=available

This is how you can, for example, get all the free tables in the restaurant. 5. Opening a table

When customers sit at the table, an invitation must be opened for them.

POST /tables/:id/open

The system needs:

    Check that the table exists.

    Check that the table is clear.

    Change the status of the table tooccupied.

    Create a new order inorders.

    Link the invitation to the table.

If the table is already taken, do not open another order for the same table. 6. Add products to order

Adding a product to an existing order should be allowed:

POST /orders/:id/items

Body for example:

{
"productId": 5,
"quantity": 2
}

Before adding the product, check:

    The order exists.

    The order is still open.

    The product exists.

    The product is available.

    The amount received is normal.

7. View Account

The current account of a table should be allowed:

GET /tables/:id/bill

For example:

{
"table": 3,
"items": [
{
"name": "Pizza",
"price": 45,
"quantity": 2,
"total": 90
},
{
"name": "Cola",
"price": 10,
"quantity": 2,
"total": 20
}
],
"total": 110
}

The total price must be calculated by the server according to the products and quantities in the order. 8. Closing a table

Once the customers pay, the table must be closed.

POST /tables/:id/close

When closing the table, the system needs:

    Make sure the table is.

    Make sure the table is taken.

    Find the active order of the table.

    Calculate the final account amount.

    Change the status of the order tocompleted.

    Change the status of the table back toavailable.

    Return the final account amount.

For example:

{
"message": "Table closed successfully",
"total": 110
}

9. Error handling and HTTP Status Codes

The right HTTP Status Codes should be used.

For example:

200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error

Do not return 200For every situation.

For example, an attempt to obtain a product that does not exist should be returned:

404 Not Found

Trying to open a table that is already taken can return:

409 Conflict

10. General Requirements

The system must include:

    Node.js server is normal.

    Working with HTTP and REST API.

    Use of - MapTo save the data.

    Working with GET, POST, PUTand -DELETE.

    Using Path Parameters.

    Use of Query Parameters.

    Get information from Request Body.

    Returns answers in JSON format.

    Proper use of HTTP Status Codes.

    Validation for the resulting data.

    Dealing with error situations.

    Orderly code, readable and clear variable names.

11. Task Limits

Do not use a database.

No need to develop a Client / Frontend.

No user system, Login or Authentication are required.

Data is saved in memory only by Map, so it is permissible for the data to be reset when the server is restarted.

All system operations will be checked with Postman.
Serving

All project files must be submitted.

The project must be operated by:

npm install

And then by using the project-defined operating command.

Make sure that all Endpoints work and tested with Postman
