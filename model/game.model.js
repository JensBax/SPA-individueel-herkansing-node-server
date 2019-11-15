const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    description: String,
    imagePath: String, 
    characters: [{
        name: String,
        description: String,
        imagePath: String
    }],
    developers: [{
        name: String, 
        imagePath: String
    }]
});

const Game = mongoose.model('game', GameSchema);

// const game1 = new Game({
//     name: 'God of War',
//     description:'God of War is een serie hack and slash-spellen uitgegeven door Sony Interactive Entertainment voor verschillende PlayStation-consoles.',
//     imagePath: 'https://media.gamestop.com/i/gamestop/10131619/God-of-War?$pdp$',
//     characters: [{
//         name: 'Kratos',
//         description: 'God of War',
//         imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Kratos_PS4.jpg/234px-Kratos_PS4.jpg'
//         }],
//     developers: [{
//         name: 'Sony Online Entertainment', 
//         imagePath: 'https://image4.owler.com/logo/daybreak-games_owler_20180907_104239_original.png'
//     }]
// }).save();

module.exports = Game;

