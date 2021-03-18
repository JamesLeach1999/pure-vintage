"use strict";

var express = require("express");

var jwt = require("jsonwebtoken");

var sharp = require("sharp");

var User = require("../models/user");

var auth = require("../middleware/auth");

var multer = require("multer");

var _require = require("../emails/account"),
    sendWelcome = _require.sendWelcome,
    sendCancel = _require.sendCancel; // auth can be used in only specific routes. will see below


var router = new express.Router(); // router.post("/admin", async (req, res) => {
//     const user = new Admin(req.body)
//     try {
//         await user.save()
//         // makes new token, even if the same every time someone makes a post request to users
//         // sendWelcome(user.email, user.name)
//         const token = await user.generateAdminAuthToken()
//         res.status(201).send({user, token})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
// to add pword hashing, you dont change this but rather the schema

router.post("/users", function _callee(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context.sent;
          res.status(201).send({
            user: user,
            token: token
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // static is on the model, methods is just instances
// bind your new method to the methods bit. this is an instance method, for each name for example
// LOGIN FUNCTION

router.post("/users/login", function _callee2(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 3:
          user = _context2.sent;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(user[0].generateAuthToken());

        case 7:
          token = _context2.sent;
          console.log(token);
          res.header("Authorization", token).send(token); //     const token = await user.generateAuthToken(req.body.email, req.body.password)

          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0);

        case 15:
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t1 = _context2["catch"](0);
          res.status(400).send("credentials not found");

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17], [4, 12]]);
}); // LOGOUT FUNCTION 
// need token which was used whentey authenticated, so go into auth and vchange 

router.post("/users/logout", auth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // access ind tokens with filter. return true when it is not thetoken, so removes when it is false. actually not sure
          req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // do it in create users too but the code is 201

router.get("/users/profile/me", auth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            req.user.password = "";
            req.user.tokens = []; // console.log(req.user)

            res.send(req.user);
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.patch("/users/me", auth, function _callee5(req, res) {
  var updates, allowedUpdates, isValidOperation;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ["name", "email", "password", "age"];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).send({
            "error": "invalid update"
          }));

        case 5:
          _context5.prev = 5;
          updates.forEach(function (update) {
            req.user[update] = req.body[update];
          });
          _context5.next = 9;
          return regeneratorRuntime.awrap(req.user.save());

        case 9:
          res.send(req.user);
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](5);
          res.status(400).send(_context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
router["delete"]("/users/me", auth, function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(req.user.remove());

        case 3:
          res.send(req.user);
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          res.status(500).send(_context6.t0);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;