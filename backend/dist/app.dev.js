"use strict";

// this is here without listen because
// this is where we get access to our express application and export it so our test suite can load it in
// index can also load it in to eventually call listen
// since we dont want duplicate files, we just load in express in app and call listen here. 
// good to keep seperate so testing can be done on app independantely 
var express = require("express");

var path = require("path");

require("./db/mongoose"); // just importing user frm the other file


var userRouter = require("../src/routers/user");

var taskRouter = require("../src/routers/task"); // remove port since we dont use listen
// well we do but we define it in index


var app = express();
app.set(express["static"](path.join(__dirname, "../views")));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
module.exports = app; // process.env gives access to env variables
// need to use a node module to access from all project also cross os