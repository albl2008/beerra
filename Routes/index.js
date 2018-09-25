const express = require('express');
const api = express.Router();
const userCtrl = require('../Controllers/userCtrl');
const User = require('../Models/user');


api.get('/',(req,res)=>{
    res.end("Soy el login")
});
api.post('/signup',userCtrl.createUser);
api.post('/login/:idUser',userCtrl.getUserById);
api.post('/login',userCtrl.getEmail);


module.exports = api;