// const fs = require('fs')
// const csv = require('csvtojson')
// const mongoose = require("mongoose")

// /*==================
//   Product Data Paths
// ===================*/
// const stylesData = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/styles.csv' // Imported
// const photosData = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/photos.json' // Imported
// const relatedData = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/related.csv' // Imported
// const skusData = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/skus.csv' // Imported
// const productData = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/product.csv' // Imported
// const features = '/Users/krombopulusmichael/HR-RPP2207/sdc_csv_files/features.csv' // Imported

// db.features.createIndex({ product_id: 1 })
// db.photos.createIndex({ styleId: 1 })
// db.product.createIndex({ id: 1 })
// db.related.createIndex({ current_product_id: 1 })
// db.skus.createIndex({ styleId: 1 })
// db.styles.createIndex({ productId: 1 })
// db.styles.createIndex({ id: 1 })
// //
// db.prodAggTest.createIndex({ id: 1 })
// db.stylesSkusAggr.createIndex({ id: 1 })
// db.stylesSkusAggr.createIndex({ productId: 1 })
// db.prodAggTest3.createIndex({ id: 1 })

// db.prodAggTest.aggregate([
//   {
//     $lookup: {
//       from: 'stylesSkusAggr',
//       localField: 'id',
//       foreignField: 'productId',
//       as: 'skus'
//     }
//   },
//   {
//     $out: {
//       db: "prodAggr",
//       coll: "prodAggMaster"
//     }
//   }
// ])

// db.prodAggTestFinal.aggregate([
//   {
//     $out: {
//       db: "productMaster",
//       coll: "products"
//     }
//   }
// ])








