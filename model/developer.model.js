const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: String, 
    imagePath: String
});

const Developer = mongoose.model('developer', DeveloperSchema);

// const developer1 = new Developer({
//     name: 'Sony Online Entertainment', 
//     imagePath: 'https://image4.owler.com/logo/daybreak-games_owler_20180907_104239_original.png'
// }).save();

module.exports = Developer;