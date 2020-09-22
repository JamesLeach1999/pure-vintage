"use strict";

var mongodb = require("mongodb");

var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var connectionUrl = "mongodb://127.0.0.1:27017";
var databaseName = "ecom_mobile";
var id = new ObjectID();
console.log(id.getTimestamp());
MongoClient.connect(connectionUrl, {
  useNewUrlParser: true
}, function (error, client) {
  if (error) {
    return console.log("unable to connect to db");
  }

  var db = client.db(databaseName);
});