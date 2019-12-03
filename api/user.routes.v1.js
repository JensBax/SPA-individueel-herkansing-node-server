//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var User = require('../model/user.model');
var CryptoJS = require("crypto-js");

//
// Geef een lijst van alle users.
//
routes.get('/users', function (req, res) {
    res.contentType('application/json');

    User.find({})
        .then(function (users) {
            res.status(200).json(users);
            console.log('users ' + users);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

//
// Retourneer één specifieke users. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/users/23
//
routes.get('/users/:id', function (req, res) {
    res.contentType('application/json');
    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Voeg een user toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/users
//
routes.post('/register', function(req, res){
    var username = req.body.username;
    console.log(username);
    console.log(req.body)
    var k = 0;
    User.find({})
    .then(function(users) {
        for(var i=0; i <= users.length; i++){
            if(i == users.length){
                    var cryptopassword = CryptoJS.AES.encrypt(req.body.password, req.body.username);
                    var new_user = new User({
                        id: req.body.id,
                        username: req.body.username,
                        password: cryptopassword,
                        favoriteGames: []
                    });
                    console.log(new_user)
                    new_user.save(function(err, task){
                    if (err)
                        res.send(err);
                        res.json(task);
                    });
            }else if(users[i].username === username){
                i = users.length;
                res.status(400).json({"error": "username is already taken"});
            }else{
                k++
            }
        }
    })
})
// routes.post('/users', function(req, res) {
//     var cryptopassword = CryptoJS.AES.encrypt(req.body.password, req.body.username);
//     // console.log("Encrypted = " + cryptopassword);
//     var new_user = new User({
//         id: req.body.id,
//         username: req.body.username,
//         gender: req.body.gender,
//         password: cryptopassword
//     });
//     new_user.save(function(err, task){
//       if (err)
//         res.send(err);
//         res.json(task);
//     });
// });

//
// Wijzig een bestaande user. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/users/23
//
routes.put('/users/:id', function (req, res) {
        
    res.contentType('application/json');
    var id = req.params.id;

    var update = {
        "username" : req.body.username,
        "password" : req.body.password,
        "favoriteGames" : req.body.favoriteGames
    };
    User.findById(id)
    .then( user => {
        user.set(update);
        user.save();
        res.status(200).json(user);
        
    })
    .catch((error) => res.status(401).json(error));
});

//
// Verwijder een bestaande user.
// Er zijn twee manieren om de id van de users mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/users/23
//
routes.delete('/users/:id', function (req, res) {
    var id = req.params.id;

    User.findById(id)
        .then(user => { 
            user.remove();
            res.status(200).send("User verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;