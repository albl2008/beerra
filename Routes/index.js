const express = require('express');
const api = express.Router();
const auth=require('../Middelwares/auth');
const userCtrl=require('../Controllers/userCtrl');




api.get('/',(req,res)=>{
    res.send({user: req.user})
});

api.post('/signup',userCtrl.signUp )
api.post('/signin',userCtrl.signIn)

/*api.get('/private',auth,function(req,res){
    res.status(200).send({message:'tienes acceso'});
});
api.post('/signin',userCtrl.singIn);
api.post('/signup',userCtrl.singUp);    
*/
module.exports = api;