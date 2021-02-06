  const mongoose = require('mongoose');
  const _ = require('lodash');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');
  const validator = require("validator");
  const bcrypt = require('bcryptjs');
// const ProductSchema = require("./products")

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
      "default": 0
      // required: true
    }
  });

  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      // removes spaces
      trim: true,
    },
    email: {
      // this guaruntees uniqueness for the db. only catch is we have to wipe the db
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        // uses the validator module then the isEmail method, checking the email value stored in value
        // value is always the field (column) itself
        // like keypair array, but the pair or value goes through validation before adding
        if (!validator.isEmail(value)) {
          throw new Error('things are not valid');
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      // minLength: 8 works too
      // goes through the first bit of validation then value has already been partially validated
      validate(value) {
        if (value.length < 6) {
          // if password too short or equals password, throw error
          throw new Error('password too short');
          // can use value.includes() can pass in multiple invalid passwords
        } else if (value === 'password') {
          throw new Error('pick a better password');
        }
      },
    },

    cart: [{ type: String }],

    pastOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }],

    isAdmin: {
      type: Boolean,
      default: false,
    },
    // required to add new item onto tokens array. stores the token of every login request made
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  });

  UserSchema.virtual("product", {
      ref: "Products",
      localField: "_id",
      foreignField: "inCart"
  })
  



  module.exports = mongoose.model("User", UserSchema)