var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Developer = require('../model/developer.model');


routes.get('/developers', function(req, res) {
    res.contentType('application/json');
    Developer.find({})
        .then((developers) => {
            res.status(200).json(developers);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/developers/:id', function(req, res) {   
    res.contentType('application/json');
    Developer.findById(req.params.id)
    .then((developer) => {
        res.status(200).json(developer);
    })
    .catch((error) => res.status(401).json(error));
});

routes.put('/developers/:id', function(req, res) {
        
    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "imagePath": req.body.imagePath,
    };
    Developer.findById(id)
        .then( developer => {
            developer.set(update);
            developer.save();
            res.status(200).json(developer);
            
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/developers', function(req, res) {
    var new_developer = new Developer(req.body);
    new_developer.save(function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
});

routes.delete('/developers/:id', function(req, res) {
var id = req.params.id;

Developer.findById(id)
    .then(developer => { 
        developer.remove();
        res.status(200).send("Developer verwijderd");
    })
    .catch(error => res.status(401).json(error));
});

module.exports = routes;