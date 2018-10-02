const express = require('express');
const api = express.Router();
const auth=require('../Middelwares/auth');
const userCtrl=require('../Controllers/auth');
const validate = require ('express-validator');
const userValidation = require ('../Services/validations');
const { authLocal } = require ('../Services/passport');





api.get('/',(req,res)=>{
    res.end("Soy el login")
});
api.post('/signup', validate(userValidation.signup), userCtrl.signUp);
api.post('/login', authLocal, userCtrl.login);

    

module.exports = api;











