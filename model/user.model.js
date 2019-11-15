const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: String
}, {
    timestamps: true
});


const User = mongoose.model('user', UserSchema);

// const user = new User({
//     name: 'Joe',
// }).save();

module.exports = User;