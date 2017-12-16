var express = require('express');
const mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;

// define the module
module.exports = function (db) {
    var router = express.Router();


    /* GET cars listing. */
    router.get('/', function (req, res, next) {
        db.collection('cars').find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "failed to get cars");
            } else {
                res.status(200).json(docs);
            }
        });
    });

    /* GET car by id. */
    router.get('/:id', function (req, res, next) {
        var id = ObjectId(req.params.id);
        db.collection('cars').findOne({'_id': id}, {}, function (err, doc) {
            if (err) {
                handleError(res, err.message, "failed to find car for id: " + id);
            } else {
                res.status(200).json(doc);
            }
        });
    });

    /* POST car */
    router.post('/', function (req, res, next) {
        var newCar = req.body;
        newCar.dateAdded = new Date();
        db.collection('cars').insertOne(req.body, function (err, result) {
            if (err) {
                handleError(res, err.message, "Insert failed, try again - " + err.message);
            } else {
                res.status(201).json(result.ops[0]);
            }
        });
    });

    /* update car */
    router.put('/:id', function (req, res, next) {
        var input = req.body;
        var id = req.params.id;
        input.dateUpdated = new Date();
        //console.log(input);
        db.collection('cars').replaceOne({'_id': ObjectId(id)}, input, {upsert: true}, function (err, result) {
            if (err) {
                handleError(res, err.message, "Update failed, try again - " + err.message);
            } else {
                input._id = id;
                res.status(204).end();
            }
        });
    });

    /* delete car */
    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        db.collection('cars').deleteOne({'_id': new ObjectId(id)}, function (err, result) {
            if (err) {
                handleError(res, err.message, "Update failed, try again - " + err.message);
            } else {
                res.status(204).end();
            }
        });
    });

    return router;
};

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};