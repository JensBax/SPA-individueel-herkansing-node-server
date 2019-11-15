var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Game = require('../model/game.model');


routes.get('/games', function(req, res) {
    res.contentType('application/json');
    Game.find({})
        .then((games) => {
            res.status(200).json(games);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/games/:id', function(req, res) {   
    res.contentType('application/json');
    Game.findById(req.params.id)
    .then((game) => {
        res.status(200).json(game);
    })
    .catch((error) => res.status(401).json(error));
});

routes.put('/games/:id', function(req, res) {
        
    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "name" : req.body.name, 
        "description" : req.body.description,
        "imagePath": req.body.imagePath,
        "characters": req.body.characters,
        "developers": req.body.developers
    };
    Game.findById(id)
        .then( game => {
            game.set(update);
            game.save();
            res.status(200).json(game);
            
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/games', function(req, res) {
    var new_game = new Game(req.body);
    new_game.save(function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
    });
});

routes.delete('/games/:id', function(req, res) {
var id = req.params.id;

Game.findById(id)
    .then(game => { 
        game.remove();
        res.status(200).send("Game verwijderd");
    })
    .catch(error => res.status(401).json(error));
});

module.exports = routes;