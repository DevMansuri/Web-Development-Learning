const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'fruitsDB';

const client = new MongoClient(url , {useNewUrlParser: true });

client.connect(function(err){
    assert.equal(null ,err);
    console.log("Connected succesfully");
    const db =  client.db(dbName);
    findDocuments(db ,function() {
        client.close();
    });
    
});

const insertDocuments = function(db, callback) {
    const collection = db.collection('fruits');
    collection.insertMany([
        {
            name: 'Apple',
            score: 5,
            review: 'osm'
        },
        {
            name: 'Bee',
            score: 5,
            review: 'osm'

        },
        {
            name: 'mpple',
            score: 5,
            review: 'osm'

        }
    ],function(err ,result) {
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("Inserted 3 data");
        callback(result);
    });
};

const findDocuments = function(db , callback) {
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err,fruits) {
        assert.equal(err,null);
        console.log("find following");
        console.log(fruits);
        callback(fruits);
    });
}
