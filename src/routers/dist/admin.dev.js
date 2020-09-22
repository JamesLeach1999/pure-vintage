"use strict";

var express = require("express");

var jwt = require("jsonwebtoken");

var sharp = require("sharp");

var Admin = require("../models/admin");

var adminAuth = require("../middleware/adminAuth");

var multer = require("multer");

var _require = require("../emails/account"),
    sendWelcome = _require.sendWelcome,
    sendCancel = _require.sendCancel; // auth can be used in only specific routes. will see below


var router = new express.Router(); // router.post("/admin", async (req, res) => {
//     const admin = new Admin(req.body)
//     try {
//         await admin.save()
//         // makes new token, even if the same every time someone makes a post request to admins
//         // sendWelcome(admin.email, admin.name)
//         const token = await admin.generateAdminAuthToken()
//         res.status(201).send({admin, token})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
// to add pword hashing, you dont change this but rather the schema

router.post("/admins", function _callee(req, res) {
  var admin, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          admin = new Admin(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(admin.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(admin.generateAdminAuthToken());

        case 6:
          token = _context.sent;
          res.status(201).send({
            admin: admin,
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

router.post("/admins/login", function _callee2(req, res) {
  var admin, token, valiUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Admin.findByCredentials(req.body.email, req.body.password));

        case 3:
          admin = _context2.sent;
          console.log(admin); // use small admin as admin is the model itself, admin is the data
          // right so this is currently broken

          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(admin[0].generateAdminAuthToken());

        case 8:
          token = _context2.sent;
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](5);
          console.log(_context2.t0);
          console.log("thats numberwang");

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(admin[0].toJSON());

        case 17:
          valiUser = _context2.sent;
          // returns error message if no work and the admin document if it works
          res.send({
            valiUser: valiUser
          }); // remember you send back the data with an object

          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t1 = _context2["catch"](0);
          res.status(400).send();

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 21], [5, 11]]);
}); // LOGOUT FUNCTION 
// need token which was used whentey authenticated, so go into auth and vchange 

router.post("/admins/logout", adminAuth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // access ind tokens with filter. return true when it is not thetoken, so removes when it is false. actually not sure
          req.admin.tokens = req.admin.tokens.filter(function (token) {
            return token.token !== req.token;
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.admin.save());

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
}); // CHALLENGE
// this logs out all admins on all devices. wipes out all the tokens
// router.post("/admins/logoutAll", auth, async (req, res) => {
//     try {
//         // access ind tokens with filter. return true when it is not thetoken, so removes when it is false. actually not sure
//         req.admin.tokens = []
//         req.admin.password = ""
//         await req.admin.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send()
//     }
// })
// // // CHALLENGE, admin pp
// const upload = multer({
//     // dest is just where they are stored
//     // auto creates directory
//     limits: {
//         // this is in bytes, so its 1mb
//         fileSize: 1000000
//     },
//     // the value is a function to run whenever a file is uploaded
//     // request made, info on file being uploaded, callback to tell multer when we done
//     // i guess file filter is a multer method
//     fileFilter(req, file, cb){
// // this runs when not a pdf
// // the \. looks for the dot cos its a special thing in regex, dollar sign just means look at the end
//         if(!file.originalname.match(/\.(jpg| jpeg| png)$/)){
//             return cb(new Error("please upload images"))
//         }
//         cb(undefined, true)
//         // cb(new Error("file must be pdf"))
//         // // undefined cos no error, true if the upload is to be expected. false to reject
//         // cb(undefined, true)
//     }
// })
// whenever you deploy, you lose the file system data stored such as images
// need a seperate route as it deals with image data not json, wanna make sure theyre authenticated before uploading
// router.post("/admins/me/avatar", auth, upload.single("avatar"), async (req, res) => {
//     // take out the dest bit, so it dosent save it to a folder. instead you can access it here
//     // remember, just use the model like its json
//     // this uses sharp to re size images, also turns it to png
//     // this is a buffer of the modified pic
//     const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
//     // this allows all images to be same size, can be found in the browser
//     req.admin.avatar = buffer
//     await req.admin.save()
//     res.send()
// // ERROR HANDLING
// }, (error, req, res, next) => {
//     // so you can use 2 middlewares here. one for processing one for error. only define in the params the processing one
//     // so it dosent return the html error page
//     res.status(400).send({error: error.message})
// })
// // CHALLENGE 
// router.delete("/admins/me/avatar", auth, async (req, res) => {
//     try {
//         // clear the avatar field. undefined in mongo just deletes it
//         req.admin.avatar = undefined
//         await req.admin.save()
//         res.send(req.admin)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
// // get admin avatar by id
// router.get("/admins/:id/avatar", async (req, res) => {
//     try {
//         const admin = await admin.findById(req.params.id)
// // get the admin back and if they have an imae. wont run the rest of expression
//         if(!admin || !admin.avatar) {
//             throw new Error()
//         }
//         // this is for header info like data types etc. by default express sends back jsoni
//         res.set("Content-type", "image/png")
//         // send back image. with this you can query localhost and get image
//         res.send(admin.avatar)
//     } catch (e) {
//         res.status(404).send()
//     }
// })
// router.post("/upload", upload.single, (req, res) => {
//     res.send()
//     // need to supply all 4 so express knows its to handle errors. basically error handling on indvidual routes
// }, (error, req, res, next) => {
//     // so you can use 2 middlewares here. one for processing one for error. only define in the params the processing one
//     res.status(400).send({error: error.message})
// })
// k so just using the me dosent work in postman. throws a 404 but dosent actually return anything. gotta use another slash for some reason
// switch up the bearer token in the auth bit in postman. have to chane manually every time you login so we use js to automatwe IN POSTMAN 
//  edit the app call, set authroization to bearer and value to {{tokenName}}
// pm here is just postman
// then: if(pm.response.code === 200) {
// the value in this key value is the entire response, its return value is the entire document in json
//  pm.environment.set("authToken", pm.response.json()
//    .admin[0].tokens.slice(-1)[0].token);
// }
// do it in create admins too but the code is 201

router.get("/admins/profile/me", adminAuth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            req.admin.password = "";
            req.admin.tokens = []; // console.log(req.admin)

            res.send(req.admin);
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
router.patch("/admins/me", adminAuth, function _callee5(req, res) {
  var updates, allowedUpdates, isValidOperation;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'image', 'brand', 'price', 'category', 'countInStock', 'description', 'description'];
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
            req.admin[update] = req.body[update];
          });
          _context5.next = 9;
          return regeneratorRuntime.awrap(req.admin.save());

        case 9:
          res.send(req.admin);
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
router["delete"]("/admins/me", adminAuth, function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(req.admin.remove());

        case 3:
          res.send(req.admin);
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