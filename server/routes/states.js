

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send("API is working properly");
    // var db = req.app.locals.db;
    // var cursor = db.collection("test").find();
    // cursor.toArray().then(c => res.json(c));
    });


router.post('/', function(req, res, next) {
    var today = new Date();
    const state = {
        "type": "states",
        "id":uuidv4(),
        "attributes": {
            "name": req.body.state,
            "abbreviation": req.body.abbreviation,
            "summary": null,
            "image": req.body.image,
            "createdAt": new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            "updatedAt": "2021-05-28 16:24:47",
            "visited": true
        }
    }
    console.log("###################");

    var db = req.app.locals.db;
    db.collection('states').insertOne(state);
    res.json({"message": "State posted"});

    });


router.patch('/', function(req, res, next) {
    const state_ = {
        'id' : req.body.id
    }

    var db = req.app.locals.db; 

    db.collection('states').updateOne(state_, {$set: {'attributes.visited': true}}, {upsert:true});

    res.json({'message': " Visited set to true "});
});

module.exports = router;