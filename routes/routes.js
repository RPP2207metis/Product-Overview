const { findOne, findRelated, findStyles } = require('../dbQueries.js')

const express = require('express')
/*==================
  Landing Page
===================*/

const homepage = (req, res) => {
  res.sendStatus(200)
}

/*==================
  List Products
===================*/

const productsAll = (req, res) => {
  res.sendStatus(200)
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
  productRelated
}