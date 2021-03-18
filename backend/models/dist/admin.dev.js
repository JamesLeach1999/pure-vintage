"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var Product = require("./products");

mongoose.connect(process.env.CONN_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
var adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // removes spaces
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("things are not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // goes through the first bit of validation then value has already been partially validated 
    validate: function validate(value) {
      if (value.length < 8) {
        // if password too short or equals password, throw error
        throw new Error("password too short"); // can use value.includes() can pass in multiple invalid passwords
      } else if (value === "password") {
        throw new Error("pick a better password");
      }
    }
  },
  // required to add new item onto tokens array. stores the token of every login request made
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
adminSchema.virtual("Products", {
  ref: "Product",
  localField: "_id",
  foreignField: "name"
});

adminSchema.methods.toJSON = function _callee() {
  var admin, adminObject;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          admin = this;
          adminObject = admin.toObject();
          return _context.abrupt("return", adminObject);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

adminSchema.methods.generateAdminAuthToken = function _callee2() {
  var admin, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          admin = this;
          token = jwt.sign({
            _id: admin._id.toString()
          }, process.env.ADMIN_SECRET);
          admin.tokens = admin.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(admin.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

adminSchema.statics.findByCredentials = function _callee3(email, password) {
  var admin, isMatch;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Admin.find({
            email: email
          }));

        case 2:
          admin = _context3.sent;

          if (admin) {
            _context3.next = 6;
            break;
          }

          console.log("nijfjvbei");
          throw new Error("unable to login");

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, admin[0].password));

        case 8:
          isMatch = _context3.sent;

          if (isMatch) {
            _context3.next = 11;
            break;
          }

          throw new Error("unable to login");

        case 11:
          return _context3.abrupt("return", admin);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};

adminSchema.pre("save", function _callee4(next) {
  var admin;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          admin = this;

          if (!admin.isModified("password")) {
            _context4.next = 5;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(admin.password, 16));

        case 4:
          admin.password = _context4.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
});
adminSchema.pre("remove", function _callee5(next) {
  var admin;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          admin = this;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.deleteMany({
            owner: admin._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  }, null, this);
});
var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;