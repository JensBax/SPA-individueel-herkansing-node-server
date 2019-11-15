const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    description: String,
    imagePath: String
});

const Character = mongoose.model('character', CharacterSchema);

// const character1 = new Character({
//     name: 'Kratos',
//     description: 'God of War',
//     imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Kratos_PS4.jpg/234px-Kratos_PS4.jpg'
// }).save();

module.exports = Character;