var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Character = require('../model/character.model');


routes.get('/characters', function(req, res) {
    res.contentType('application/json');
    Character.find({})
        .then((characters) => {
            res.status(200).json(characters);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/characters/:id', function(req, res) {   
    res.contentType('application/json');
    Character.findById(req.params.id)
    .then((character) => {
        res.status(200).json(character);
    })
    .catch((error) => res.status(401).json(error));
});

routes.put('/characters/:id', function(req, res) {
        
    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "description" : req.body.description,
        "imagePath": req.body.imagePath,
    };
    Character.findById(id)
        .then( character => {
            character.set(update);
            character.save();
            res.status(200).json(character);
            
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/characters', function(req, res) {
    var new_character = new Character(req.body);
    new_character.save(function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
});

routes.delete('/characters/:id', function(req, res) {
var id = req.params.id;

Character.findById(id)
    .then(character => { 
        character.remove();
        res.status(200).send("Character verwijderd");
    })
    .catch(error => res.status(401).json(error));
});

module.exports = routes;