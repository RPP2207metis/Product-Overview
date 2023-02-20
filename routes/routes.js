const { findAll, findOne, findRelated, findStyles} = require('../dbQueries.js')

const express = require('express')
/*==================
  Landing Page
===================*/

const homepage = (req, res) => {
  res.sendStatus(200)
}

const loaderio = (req, res) => {
  res.send(`${process.env.LOADERIO}`)
}
//
/*==================
  List Products
===================*/

const productsAll = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let count = parseInt(req.query.count) || 5;
  findAll(page, count)
  .then(products => {
    res.send(products);
  })
}

/*==================
  Product Information
===================*/

const productOne = (req, res) => {
  findOne(parseInt(req.params.product_id))
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    throw err
  })
}

/*==================
  Product Styles
===================*/

const productStyles = (req, res) => {
  findStyles(parseInt(req.params.product_id))
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    throw err
  })
}


/*==================
  Related Products
===================*/

const productRelated = (req, res) => {
  findRelated(parseInt(req.params.product_id))
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    throw err
  })
}

module.exports = {
  homepage,
  productsAll,
  productOne,
  productStyles,
  productRelated,
  loaderio
}