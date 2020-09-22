const mongodb = require("mongodb");
const MongoClient  = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "ecom_mobile";
const id = new ObjectID();
console.log(id.getTimestamp())


MongoClient.connect(connectionUrl, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log("unable to connect to db");
    }
    const db = client.db(databaseName);

})