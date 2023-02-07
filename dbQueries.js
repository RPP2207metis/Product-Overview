/*==================
DB Connection
===================*/
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose.connect(process.env.DATABASEURL); // no need for {useNewUrlParser: true} anymore?
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connection to Database Established!'));


const productSchema = new mongoose.Schema({});
//ProductAggr
// const Product = mongoose.model('Product', productSchema, 'prodAggTestFinal')
const Product = mongoose.model('Product', productSchema, 'products')

//Find All
const findAll = (page, count) => {
  var products = [];
  var promises = [];
  var start = count * page - count + 1
  for (let i = start; i < start + count; i++) {
    promises.push(Product.find({id: i})
    .then(result => {
      result = result[0]._doc;
      let formattedResult = {
        "id": result.id,
        "name": result.name,
        "slogan": result.slogan,
        "description": result.description,
        "category": result.category,
        "default_price": result.default_price.toString(),
      }
      products.push(formattedResult);
    }))
  }
  return Promise.all(promises)
  .then(() => {
    return products;
  })
}

//Find One Product//
const findOne = (productId) => {
  var formattedObj = {}
  return Product.find({ id: productId })
    .then((res) => {
      const result = res[0]._doc
      const formattedFeatures = []
      result.features.forEach((feature) => {
        formattedFeatures.push({ feature: feature.feature, value: feature.value })
      })
      formattedObj.id = result.id
      formattedObj.name = result.name
      formattedObj.slogan = result.slogan
      formattedObj.description = result.description
      formattedObj.category = result.category
      formattedObj.default_price = result.default_price.toString()
      formattedObj.features = formattedFeatures
    })
    .then(() => {
      return formattedObj
    })
    .catch((err) => {
      throw err
    })
}

const findStyles = (productId) => {
  const container = {
    product_id: productId,
    results: []
  }
  return Product.find({ id: productId })
    .then((res) => {
      const result = res[0]._doc
      result.styles.forEach((style) => {
        var photos , skus
        photos = style.photos;
        skus = style.skus
        let formattedData = {} ;
        formattedData.style_id= style.id;
        formattedData.name= style.name;
        formattedData.original_price= style.original_price.toString()
        formattedData.sale_price= style.sale_price;
        formattedData['default?']= (style.default_style === 1 ? true : false);
        formattedData.photos= [];
        formattedData.skus = {};
        photos.forEach((photo) => {
          formattedData.photos.push({
            thumbnail_url: photo.thumbnail_url,
            url: photo.url
          })
        })
        skus.forEach((sku) => {
          const currentid = sku.id
          formattedData.skus[currentid] = {
            quantity: sku.quantity,
            size: sku.size.toString()
          }
        })
        container.results.push(formattedData);
      });
    })
    .then(() => {
      return container
    })
}

//Find Related Products//
const findRelated = (productId) => {
  var container = []
  return Product.find({ id: productId })
    .then((res) => {
      const result = res[0]._doc
      result.related.forEach((product) => {
        container.push(product.related_product_id)
      })
    })
    .then(() => {
      return container
    })
}

module.exports = {
  findAll,
  findOne,
  findStyles,
  findRelated
}