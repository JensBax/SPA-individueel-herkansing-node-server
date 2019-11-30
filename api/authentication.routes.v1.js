//
// ./api/authentication.routes.v1.js
//
var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
var settings = require('../config/env/env')
var jwt = require('jsonwebtoken');
var auth = require('../auth/authentication');
var CryptoJS = require("crypto-js");

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.find({})
    .then(function(users) {
        for(var i=0; i <= users.length; i++){
            if(users[i].username === username){
                console.log(username);
                var decryptedPassword = CryptoJS.AES.decrypt(users[i].password, username);
                    if(decryptedPassword.toString(CryptoJS.enc.Utf8) == password){
                    var token = jwt.sign({username: username},
                        settings.env.secretkey,
                        { expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    var k = i;
                    var sendUsername = users[k].username;
                    var sendGender = users[k].gender;
                    var id = users[k]._id;
                    i = users.length;
                    res.status(200).json({
                        id: id,
                        username: sendUsername,
                        gender: sendGender,
                        token: token
                    }); 
                }
            }
        }
    })
    .catch((error) => {console.log(error); res.status(401).json({"error": "Username or password is invalid"})});
})


// Hiermee maken we onze router zichtbaar voor andere bestanden. 
module.exports = router;