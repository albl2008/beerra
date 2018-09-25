const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function getEmail(req,res){
    try{
        await User.findOne({email:req.body.email},function (err, user){
            if (err){ 
                throw err}
                else{
            if(user){
                bcrypt.compare(req.body.password,user.password,function(err,isMatch){
                    if(err) throw err;
                    if (isMatch){
                    var token = jwt.sign(user.toJSON(),config.secret,{expiresIn:600000});    
                    res.json({sucess:true,token:token,user:{
                        email:user.email,
                        password:user.password
                    }});
                        
                }else{
                    return res.json({success:false,message:'No coincide la contraseña'});
                }
                })  
               
            }else{
            res.json({success:false,message:'Usuario o contraseña incorrecto'});
        }
        }})
    }
    catch(err){
        res.status(500).send(`Error al obtener el email ${err}`)
    }
}

async function getUserById(req,res){
    try{
        let idUser = req.params.idUser
       
        await User.findById(idUser, function (err, user) {
        if (err) throw err
        if(!user){
            return res.json({success:false,message:'Usuario no encontrado'});
        }
        if(user.email==req.body.email){
            bcrypt.compare(req.body.password,user.password,function(err,isMatch){
                if(err) throw err;
                if (isMatch){
                var token = jwt.sign(user.toJSON(),config.secret,{expiresIn:600000});    
                res.json({sucess:true,token:token,user:{
                    email:user.email,
                    password:user.password
                }});
                    
            }else{
                return res.json({success:false,message:'No coincide la contraseña'});
            }
            }) 
        }else{
            return res.json({success:false,message:'Usuario o contraseña incorrecto'});
        }
        
       
    });
    }
    catch(err){
        res.status(500).send(`Error al obtener el usuario ${err}`)
    }
}

async function createUser(req,res){
    
    try {

        let user = new User();
        user.email = req.body.email
        
        bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            user.password = hash;
            user.save();
        })
        
    })
        
        res.status(200).send({user})
            
    } catch (err) {

        res.status(500).send(`Error al guardar el usuario ${err}`)
    }
}


module.exports={
    createUser,
    getUserById,
    getEmail
}