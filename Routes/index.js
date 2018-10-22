const express = require('express');
const api = express.Router();
const auth=require('../Middelwares/auth');
const userCtrl=require('../Controllers/auth');




api.get('/',(req,res)=>{
    res.end("Soy el login")
});
api.get('/private',auth,function(req,res){
    res.status(200).send({message:'tienes acceso'});
});
api.post('/signin',userCtrl.singIn);
api.post('/signup',userCtrl.singUp);    

module.exports = api;