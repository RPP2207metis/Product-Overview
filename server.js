/*==================
  Dependencies
===================*/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { homepage , productsAll, productOne, productStyles, productRelated } = require('./routes/routes.js')

/*==================
Server and DB Connection
===================*/
const app = express();


/*==================
  Middleware
===================*/
app.use(express.json())

/*==================
  Routes
===================*/

/* Homepage */
app.get('/', homepage)

/* All Products */
app.get('/products', productsAll)

/* One Product */
app.get('/products/:product_id', productOne)

/* Product Styles */
app.get('/products/:product_id/styles', productStyles)

/* Related Products */
app.get('/products/:product_id/related', productRelated)

/* Flood.io Authentication */
app.get('/loaderio-0e33c96a764a88d0187f517e11e8d50a', loaderio )

/* TEST ROUTE */
app.get('/test', (req, res) => {
  res.sendStatus(200)
})

/*==================
  Server Listening
===================*/
app.listen(process.env.PORT, () => console.log(`Server on localhost ${process.env.PORT}...`))


