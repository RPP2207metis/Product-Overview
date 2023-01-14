/*==================
  Mongo Schema
===================*/

var product = {
  productId: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  defaultPrice: Number,
  features: [
    {
      feature: String,
      value: String,
    }
  ],
  styles: [
    {
      styleId: Number,
      name: String,
      salePrice: Number,
      originalPrice: Number,
      defaultStyle: BOOLEAN,
      photos: [
        {
          url: String,
          thumbnailUrl: String
        }
      ],
      skuData: [
        {
          skuId: Number,
          size: String,
          quantity: Number
        }
      ]
    }
  ]
}

/*==================
  Aggregation Commands:
===================*/


/*==================
  Product Aggregation - All
===================*/

db.product.aggregate([
  {
    $lookup: {
      from: 'related',
      localField: 'id',
      foreignField: 'current_product_id',
      as: 'related'
    }
  },
  {
    $lookup: {
      from: 'features',
      localField: 'id',
      foreignField: 'product_id',
      as: 'features'
    }
  },
  {
    $lookup: {
      from: 'styles',
      localField: 'id',
      foreignField: 'productId',
      as: 'styles'
    }
  },
  {
    $lookup: {
      from: 'photos',
      localField: 'id',
      foreignField: 'styleId',
      as: 'photos'
    }
  },
  {
    $lookup: {
      from: 'skus',
      localField: 'id',
      foreignField: 'styleId',
      as: 'skus'
    }
  },
  {
    $out: {
      db: "aggProductData",
      coll: "products"
    }
  }
])

/*==================
 Photos Aggregation
===================*/


db.photos.aggregate([
  {
    $addFields: {
      intId: { $toInt: "$id" },
    }
  },
  {
    $addFields: {
      intStyleId: { $toInt: "$styleId" },
    }
  }
])

/*==================
 Product Aggregation
===================*/

db.product.aggregate([
  {
    $lookup: {
      from: 'related',
      localField: 'id',
      foreignField: 'current_product_id',
      as: 'related'
    }
  },
  {
    $lookup: {
      from: 'features',
      localField: 'id',
      foreignField: 'product_id',
      as: 'features'
    }
  },
  {
    $lookup: {
      from: 'styles',
      localField: 'id',
      foreignField: 'productId',
      as: 'styles'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "prodAggTest"
    }
  }
])

/*==================
  Styles Aggregation
===================*/

db.styles.aggregate([
  {
    $lookup: {
      from: 'skus',
      localField: 'id',
      foreignField: 'styleId',
      as: 'skus'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "stylesSkusAggr"
    }
  }
])

/*==================
  CURRENT AGG COMMAND
===================*/

db.product_related.aggregate([
  {
    $lookup: {
      from: 'features',
      localField: 'id',
      foreignField: 'product_id',
      as: 'features'
    }
  },
  {
    $out: {
      db: "agg2",
      coll: "product_related_features"
    }
  }
])

db.prodAggTest.aggregate([
  {
    $lookup: {
      from: 'stylesSkusAggr',
      localField: 'id',
      foreignField: 'productId',
      as: 'styles'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "prodAggTest2"
    }
  }
])

module.exports = mongoose.model('Product')