"use strict";

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    "default": 0
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    "default": 0,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    "default": 0,
    required: true
  },
  numReviews: {
    type: Number,
    "default": 0,
    required: true
  },
  reviews: [reviewSchema]
});
var Product = mongoose.model('Product', productSchema);
module.exports = Product; // {
// {
//   "name": "shoe",
//   "image": "np.png",
//   "brand": "shoe",
//   "price": 21,
//   "category": "shoe",
//   "countInStock": 7,
//   "description": "shoe",
//   "rating": 4,
//   "numReviews": 4,
//   "reviews": [{
//       "name": "goofd",
//       "rating": 3,
//       "comment": "v good"
//   }]
// }