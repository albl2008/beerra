const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const config = require('../config');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;

