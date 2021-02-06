const mongoose = require('mongoose');

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
  
  var productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      image: [
        {
          type: String,
          required: true,
        },
      ],
      brand: {
        type: String,
        default: 'n/a',
        required: true,
      },
      price: {
        type: Number,
        default: 0,
        required: true,
      },
      category: {
        type: String,
        default: 'n/a',

        required: true,
      },
      size: {
        type: String,
        default: 'n/a',

        required: true,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
      description: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
        // required: true
      },
      gender:{
        type: Boolean,
        default: true,
        required: true,
      },
      featured: {
        type: Boolean,
        default: false,
      },
      inStock: {
        type: Boolean,
        default: true,
      },

      numReviews: {
        type: Number,
        default: 0,
        // required: true
      },
      reviews: [reviewSchema],
    },
    {
      timestamps: true,
    }
  );



module.exports = mongoose.model('Products', productSchema);