const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    favoriteGames: [{
        name: String,
        description: String,
        imagePath: String, 
    }]
});


const User = mongoose.model('user', UserSchema);

// const user = new User({
//     name: 'Joe',
// }).save();

module.exports = User;