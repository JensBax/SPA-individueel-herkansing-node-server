var settings = require('../config/env/env');
const moment = require('moment');
//const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');


let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token){
        if(token.startsWith('Bearer ')){
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
    }else{
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }

    if (token) {
        jwt.verify(token, settings.env.secretkey, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken
};