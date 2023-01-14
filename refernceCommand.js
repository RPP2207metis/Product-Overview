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

db.prodAggTest.aggregate([
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
      coll: "prodAggTest2"
    }
  }
])

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
      coll: "prodAggTest2"
    }
  }
])

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
      coll: “skusAggr”
    }
  }
])

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

db.productAggTest.aggregate([
  {
    $lookup: {
      from: 'stylesSkusAggr',
      localField: 'id',
      foreignField: 'id',
      as: 'skus'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "prodAggTest2"
    }
  }
])

db.productAggTest.aggregate([
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
      coll: "prodAggTest3"
    }
  }
])

db.styles.aggregate([
  {
    $lookup: {
      from: 'photos',
      localField: 'id',
      foreignField: 'styleId',
      as: 'photos'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "stylesPhotosAggr"
    }
  }
])


db.prodAggTest3.aggregate([
  {
    $lookup: {
      from: 'stylesPhotosAggr',
      localField: 'id',
      foreignField: 'productId',
      as: 'styles'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "prodAggTestFinal"
    }
  }
])

db.prodAggTest3.createIndex({ id: 1 })

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
    $lookup: {
      from: 'photos',
      localField: 'id',
      foreignField: 'styleId',
      as: 'photos'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "stylesSkusPhotosAggr"
    }
  }
])

db.stylesSkusPhotosAggr.createIndex({ productId: 1 })

db.prodAggTest3.aggregate([
  {
    $lookup: {
      from: 'stylesSkusPhotosAggr',
      localField: 'id',
      foreignField: 'productId',
      as: 'styles'
    }
  },
  {
    $out: {
      db: "prodAggr",
      coll: "prodAggTestFinal"
    }
  }
])

db.prodAggTestFinal.find({ id: 1000011 })