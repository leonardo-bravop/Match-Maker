const  mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name:  String, 
    surname: String,
    email:   String,
    password: String,
    age: Number,
});

module.exports = mongoose.model('user', userSchema)