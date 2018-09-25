const express = require('express');
const api = express.Router();
const userCtrl = require('../Controllers/userCtrl');
const User = require('../Models/user');
const config = require('../config');

api.get('/',(req,res)=>{
    res.end("Soy el login")
});
api.post('/signup',userCtrl.createUser);
api.post('/login',function(req,res){
    userCtrl.getUserByEmail(req.body.email)
        if(err) throw err;  
        if(!user){
            return res.json({success:false,message:'Usuario no encontrado'});
        }
        userCtrl.comparePassword(req.body.password,user.password,function(err,IsMatch){
            if (err) throw err;
            if (IsMatch){
                const token = jwt.sing(user,config.secret,{expiresIn:600000});
                res.json({success:true,token,user:{
                    id:user._id,
                    email: user.email,
                    password:user.password
                }
                });

            }else{
                return res.json({success:false,message:'password no coincide'});
            }
        })
    }
);


module.exports = api;