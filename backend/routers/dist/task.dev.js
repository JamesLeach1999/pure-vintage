"use strict";

var express = require('express');

var Product = require('../models/products');

var auth = require('../middleware/auth');

var router = new express.Router(); // THIS IS THE ? QUERY URL BIT. THIS IS WHERE YOU SET THE PARAMS AND WHAT TO DO ETC
// 2 options, limit and skip
// this is called pagination for some reason
// skip is weird. 0 is first page, 10 second 20 third. goes up in 10s depending on whst your limit is
// /tasks?limit=15&skip=30
// /tasks?sortBy=createdAt_asc
// so its like if limit is 10 and skip is 2, starts at 20

router.get('/products', auth, function _callee(req, res) {
  var match, sort, parts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // just like in the weather app. acces like its json
          match = {};
          sort = {}; // looks at if sortBy was provided

          if (req.query.sortBy) {
            // need the special character so you can split it
            // grabbing the first item in the parts array, the name of the property youre trying yo chngr
            parts = req.query.sortBy.split('_'); // this is basically an if statement, if desc is true value is minus one, else whatever after the colon aka 1
            // if sort parts[0] is set then if the value is desc, then the code to run if or if not
            // sort is an array, looks at second value in parts (asc or desc), if = desc, value = -1

            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
          }

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(req.user.populate({
            path: 'products',
            // need to use match to make the paraneters
            match: match,
            options: {
              // parseint takes strings and turns them into numbers
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort: sort // ascending is one descending minus one. this is how to sort through tasks. based on the timestamp

            }
          }).execPopulate());

        case 6:
          res.status(200).send(req.user.products);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          res.status(404).send();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
}); // CREATE Products

router.post('/product', auth, function _callee2(req, res) {
  var product, newProduct;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(product.save());

        case 3:
          newProduct = _context2.sent;

          if (!newProduct) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(201).send({
            message: 'New Product Created',
            data: newProduct
          }));

        case 6:
          return _context2.abrupt("return", res.status(500).send({
            message: ' Error in Creating Product.'
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/products/:id', auth, function _callee3(req, res) {
  var _id, product;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: _id
          }));

        case 4:
          product = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).send());

        case 7:
          res.status(201).send(product);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.patch('/products/:id', auth, function _callee4(req, res) {
  var updates, allowedUpdates, isValidOperation, admin;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'image', 'brand', 'price', 'category', 'countInStock', 'description', 'description'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).send({
            error: 'invalid update'
          }));

        case 5:
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id,
            owner: req.user._id
          }));

        case 8:
          admin = _context4.sent;

          if (admin) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(404).send());

        case 11:
          updates.forEach(function (update) {
            admin[update] = req.body[update];
          }); // remember to use right models

          _context4.next = 14;
          return regeneratorRuntime.awrap(admin.save());

        case 14:
          res.send(admin);
          _context4.next = 20;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](5);
          res.status(400).send(_context4.t0);

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 17]]);
});
router["delete"]('/products/:id', auth, function _callee5(req, res) {
  var admin;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndDelete({
            _id: req.params.id,
            owner: req.admin._id
          }));

        case 3:
          admin = _context5.sent;

          if (admin) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).send());

        case 6:
          res.send(admin);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;