"use strict";

var app = require("./app");

var port = process.env.PORT;
app.listen(port, function () {
  console.log("server up on port " + port);
});