"use strict";

// HERE WE SET UP AND DEFINE AUTHENTICATION MIDDLEWARE
var jwt = require("jsonwebtoken");

var Admin = require("../models/admin");

var adminAuth = function adminAuth(req, res, next) {
  var token, decoded, admin;
  return regeneratorRuntime.async(function adminAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _context.prev = 1;
          // have to use the headers bit in postman. you used params thats why it wasnt working
          token = req.header("Authorization").replace("Bearer ", "");
          console.log(token);
          decoded = jwt.verify(token, process.env.ADMIN_SECRET); // looks for a given token value in the tokens array
          // remember, when using the admin bit, thats essentially your database query

          _context.next = 7;
          return regeneratorRuntime.awrap(Admin.findOne({
            _id: decoded._id,
            "tokens.token": token
          }));

        case 7:
          admin = _context.sent;
          console.log(admin);

          if (admin) {
            _context.next = 11;
            break;
          }

          throw new Error();

        case 11:
          req.admin = admin;
          req.token = token;
          next();
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          res.status(401).send({
            "error": "auth did notn work",
            e: _context.t0
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

module.exports = adminAuth;