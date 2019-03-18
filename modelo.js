// http://mongodb.github.io/node-mongodb-native/3.1/tutorials

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Long = require('mongodb').Long;
// Connection URL
const url = 'mongodb://localhost:32769';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) {
        console.log('Errores', err);
    } else {
        const db = client.db(dbName);
        insertDocuments(db, function (data) {
            console.log(data);
            findDocuments(db,(resBusqueda)=>{
                console.log(resBusqueda)
                client.close();
            })

        })
    }
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        console.log("Inserted 3 documents into the collection");
        console.log(result);
        callback(result);
    });

}

const insertarUno = function (db) {
    db.collection('inserts').insertOne({a:1}, function(err, r) {
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}


const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({'a': 3}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
        { "a": 1 },
        null,
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};


// DATA TYPES
// https://docs.mongodb.com/manual/reference/bson-types/

const Long = require('mongodb').Long;
const Decimal = require('mongodb').Decimal128;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    const longValue = Long(1787);
    const decimalValue = Decimal.fromString("27.8892836");

    // Insert multiple documents
    db.collection('numbers').insertMany([ { a : longValue }, { b : decimalValue } ], function(err, r) {
        assert.equal(null, err);
        assert.equal(2, r.insertedCount);
        client.close();
    });
});



// UPDATE

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    const col = db.collection('updates');
    // Insert a single document
    col.insertMany([{a:1}, {a:2}, {a:2}], function(err, r) {
        assert.equal(null, err);
        assert.equal(3, r.insertedCount);

        // Update a single document
        col.updateOne({a:1}, {$set: {b: 1}}, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.matchedCount);
            assert.equal(1, r.modifiedCount);

            // Update multiple documents
            col.updateMany({a:2}, {$set: {b: 1}}, function(err, r) {
                assert.equal(null, err);
                assert.equal(2, r.matchedCount);
                assert.equal(2, r.modifiedCount);

                // Upsert a single document
                col.updateOne({a:3}, {$set: {b: 1}}, {
                    upsert: true
                }, function(err, r) {
                    assert.equal(null, err);
                    assert.equal(0, r.matchedCount);
                    assert.equal(1, r.upsertedCount);
                    client.close();
                });
            });
        });
// REMOVING


        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('removes');
            // Insert a single document
            col.insertMany([{a:1}, {a:2}, {a:2}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.insertedCount);

                // Remove a single document
                col.deleteOne({a:1}, function(err, r) {
                    assert.equal(null, err);
                    assert.equal(1, r.deletedCount);

                    // Update multiple documents
                    col.deleteMany({a:2}, function(err, r) {
                        assert.equal(null, err);
                        assert.equal(2, r.deletedCount);
                        client.close();
                    });
                });
            });
        });

//FINDONEANDUPDATE

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('findAndModify');
            // Insert a single document
            col.insert([{a:1}, {a:2}, {a:2}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.result.n);

                // Modify and return the modified document
                col.findOneAndUpdate({a:1}, {$set: {b: 1}}, {
                    returnOriginal: false
                    , sort: [[a,1]]
                    , upsert: true
                }, function(err, r) {
                    assert.equal(null, err);
                    assert.equal(1, r.value.b);

                    // Remove and return a document
                    col.findOneAndDelete({a:2}, function(err, r) {
                        assert.equal(null, err);
                        assert.ok(r.value.b == null);
                        client.close();
                    });
                });
            });
        });


// FINDONEANDDELET

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('findAndModify');
            // Insert a single document
            col.insert([{a:1}, {a:2}, {a:2}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.result.n);

                // Remove a document from MongoDB and return it
                col.findOneAndDelete({a:1}, {
                        sort: [[a,1]]
                    }
                    , function(err, r) {
                        assert.equal(null, err);
                        assert.ok(r.value.b == null);
                        client.close();
                    });
            });
        });

//bULKWRITR


        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Get the collection
            const col = db.collection('bulk_write');
            col.bulkWrite([
                    { insertOne: { document: { a: 1 } } }
                    , { updateOne: { filter: {a:2}, update: {$set: {a:2}}, upsert:true } }
                    , { updateMany: { filter: {a:2}, update: {$set: {a:2}}, upsert:true } }
                    , { deleteOne: { filter: {c:1} } }
                    , { deleteMany: { filter: {c:1} } }
                    , { replaceOne: { filter: {c:3}, replacement: {c:4}, upsert:true}}]
                , {ordered:true, w:1}, function(err, r) {
                    assert.equal(null, err);
                    assert.equal(1, r.insertedCount);
                    assert.equal(1, Object.keys(r.insertedIds).length);
                    assert.equal(1, r.matchedCount);
                    assert.equal(0, r.modifiedCount);
                    assert.equal(0, r.deletedCount);
                    assert.equal(2, r.upsertedCount);
                    assert.equal(2, Object.keys(r.upsertedIds).length);

                    // Ordered bulk operation
                    client.close();
                });
        });

//READ


        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('find');
            // Insert a single document
            col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.insertedCount);

                // Get first two documents that match the query
                col.find({a:1}).limit(2).toArray(function(err, docs) {
                    assert.equal(null, err);
                    assert.equal(2, docs.length);
                    client.close();
                });
            });
        });
// BUSQUEDA


        collection.find({}).project({a:1})                             // Create a projection of field a
        collection.find({}).skip(1).limit(10)                          // Skip 1 and limit 10
        collection.find({}).batchSize(5)                               // Set batchSize on cursor to 5
        collection.find({}).filter({a:1})                              // Set query on the cursor
        collection.find({}).comment('add a comment')                   // Add a comment to the query, allowing to correlate queries
        collection.find({}).addCursorFlag('tailable', true)            // Set cursor as tailable
        collection.find({}).addCursorFlag('oplogReplay', true)         // Set cursor as oplogReplay
        collection.find({}).addCursorFlag('noCursorTimeout', true)     // Set cursor as noCursorTimeout
        collection.find({}).addCursorFlag('awaitData', true)           // Set cursor as awaitData
        collection.find({}).addCursorFlag('exhaust', true)             // Set cursor as exhaust
        collection.find({}).addCursorFlag('partial', true)             // Set cursor as partial
        collection.find({}).addQueryModifier('$orderby', {a:1})        // Set $orderby {a:1}
        collection.find({}).max(10)                                    // Set the cursor max
        collection.find({}).maxTimeMS(1000)                            // Set the cursor maxTimeMS
        collection.find({}).min(100)                                   // Set the cursor min
        collection.find({}).returnKey(10)                              // Set the cursor returnKey
        collection.find({}).setReadPreference(ReadPreference.PRIMARY)  // Set the cursor readPreference
        collection.find({}).showRecordId(true)                         // Set the cursor showRecordId
        collection.find({}).sort([['a', 1]])                           // Sets the sort order of the cursor query
        collection.find({}).hint('a_1')



        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('find');
            // Insert a single document
            col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.insertedCount);

                // Get first documents from cursor
                col.find({a:1}).limit(2).next(function(err, doc) {
                    assert.equal(null, err);
                    assert.ok(doc != null);
                    client.close();
                });
            });
        });



        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('find');
            // Insert a single document
            col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
                assert.equal(null, err);
                assert.equal(3, r.insertedCount);

                // Get first documents from cursor using each
                col.find({a:1}).limit(2).each(function(err, doc) {
                    if(doc) {
                        // Got a document
                    } else {
                        client.close();
                        return false;
                    }
                });
            });
        });


        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            findDocuments(db, function() {
                client.close();
            });
        });


        function findDocuments(db, callback) {
            // Get the documents collection
            const collection = db.collection( 'restaurants' );
            // Find some documents
            collection
                .find({ 'cuisine' : 'Brazilian' })
                .project({ 'name' : 1, 'cuisine' : 1 })
                .toArray(function(err, docs) {
                    assert.equal(err, null);
                    console.log("Found the following records");
                    console.log(docs)
                    callback(docs);
                });
        }

        { 'name' : 1, 'cuisine' : 1, '_id': 0 }



        { 'address' : 0 }



        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            simplePipeline(db, function() {
                client.close();
            });
        });

        function simplePipeline(db, callback) {
            const collection = db.collection( 'restaurants' );
            collection.aggregate(
                [ { '$match': { "borough": "Bronx" } },
                    { '$unwind': '$categories'},
                    { '$group': { '_id': "$categories", 'Bronx restaurants': { '$sum': 1 } } }
                ],
                function(err, cursor) {
                    assert.equal(err, null);

                    cursor.toArray(function(err, documents) {
                        console.log(documents)
                        callback(documents);
                    });
                }
            );
        }


        // COUNT

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            simpleCount(db, function() {
                client.close();
            });
        });

        function simpleCount(db, callback) {
            const collection = db.collection( 'restaurants' );
            collection.count({ 'categories': [ 'Chinese', 'Seafood' ] },
                function(err, result) {
                    assert.equal(err, null);
                    console.log(result)
                    callback(result);
                }
            );
        }


        // GROUP

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            simpleGroup(db, function() {
                client.close();
            });
        });

        function simpleGroup(db, callback) {
            const collection = db.collection( 'restaurants' );
            collection.group( ['stars'],
                { 'categories': ['Peruvian'] },
                { 'total': 0 },
                "function ( curr, result ) { result.total++ }",
                function(err, result) {
                    assert.equal(err, null);
                    console.log(result)
                    callback(result);
                }
            );
        }


        //DISTINCT

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            simpleDistinct(db, function() {
                client.close();
            });
        });

        function simpleDistinct(db, callback) {
            const collection = db.collection( 'restaurants' );
            collection.distinct( 'categories', function(err, result) {
                assert.equal(err, null);
                console.log(result)
                callback(result);
            });
        }

        // TEXT SEARCH

        function createTextIndex(db, callback) {
            // Get the restaurants collection
            const collection = db.collection('restaurants');
            // Create the index
            collection.createIndex(
                { name : "text" }, function(err, result) {
                    console.log(result);
                    callback(result);
                });
        };


        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Create a new MongoClient
        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);
            createTextIndex(db, function() {
                client.close();
            });
        });


        // TEXT SEARCH


        function findDocuments(db, callback) {
            // Get the documents collection
            const collection = db.collection('restaurants');
            // Find some documents
            collection.find({ '$text': {'$search' : 'Garden' } } ).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs);
                callback(docs);
            });
        }

// use the findDocuments() function
        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

// Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

        const client = new MongoClient(url);

// Use connect method to connect to the Server
        client.connect(function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            findDocuments(db, function() {
                client.close();
            });
        });



        // Agregacion
        // https://docs.mongodb.com/manual/aggregation/
        // https://docs.mongodb.com/manual/core/aggregation-pipeline/
        // https://docs.mongodb.com/manual/reference/operator/aggregation/