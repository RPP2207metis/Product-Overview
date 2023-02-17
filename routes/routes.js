const Redis = require('redis')
const DEFAULT_EXPIRATION = 3600

//PRODUCTION INSTANCE OF REDDIS
const redisClient = Redis.createClient({ url: 'http://54.185.5.152/'}) //PRODUCTION INSTANCE

//LOCALHOST INSTANCE OF REDIS
// const redisClient = Redis.createClient()

//Connect To The Redis DB Prior To Get and Set
redisClient
  .connect()
  .then((res) => {
    console.log('connected')
  })

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

const productOne = async (req, res) => {
  let results;
  let isCached =  false;
  var productId = req.params.product_id
  try {
    const cacheResults = await redisClient.get(productId)
      if (cacheResults) {
        isCached = true;
        results = JSON.parse(cacheResults)
      } else {
        findOne(parseInt(productId))
        .then((result) => {
          redisClient.set(`${result.id}`, JSON.stringify(result))
          res.send(result)
        })
        .catch((err) => {
          throw err
        })
      }
      res.send({
        fromCache: isCached,
        data: results
      })
  } catch (err) {
    console.log(err)
  }
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