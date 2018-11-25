const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const userSchema = new Schema({
  
  username: {type: String, required:false},
  password: {type: String,select:false},
  
});

const Users = mongoose.model('users', userSchema)

module.exports = Users