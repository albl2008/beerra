const Joi = require('joi')
const User  = require('../Models/user1')
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).trim().required(),
   
})
async function signUp(req,res,next){
    
        const result = Joi.validate(req.body, schema);
        if(result.error === null){ 
            const user = await User.findOne({username: req.body.username})
            if(user){
                // there is a user with this username
                // response with an error
                const e = new Error("El usuario elegido ya existe ")
                e.status = 409
                next(e)
                
            }else{
                // hash the password
                hashedPassword = await bcrypt.hash(req.body.password,12)
                // insert the user with the hashed paswsword
               const newUser = new User({
                   username: req.body.username,
                   password: hashedPassword
               })
              const insertedUser = await newUser.save()
                if(insertedUser){
                    createTokenSendResponse(insertedUser, res, next)
                }

            }
        }else{
            const e = new Error("El usuario es ivalido")
            e.status = 422
            next(e)
        }
    }    
async function signIn(req,res,next){
    try {
        
        const result = Joi.validate(req.body, schema);
        if(result.error === null){ 
            const user = await User.findOne({username: req.body.username}).select("+password")
            console.log(user)
            if(user){
                const resultPass = await  bcrypt.compare(req.body.password, user.password)
                console.log(resultPass)
                if(resultPass){
                    createTokenSendResponse(user, res, next)            
                }
            }else{
                const error = new Error('El usuario no existe.')
                error.status = 422
                next(error)
            }
        }else{
            const error = new Error('Informacion invalida.')
            error.status = 422
            next(error)
        }
    } catch (error) {
        next(error  )
    }
 

}

async function createTokenSendResponse(user, res, next){
    const payload = {
        _id: user._id,
        username: user.username
       }
       const token = await jwt.sign(payload,config.TOKEN_SECRET,{
           expiresIn: '1d'
       })
       if(token){
           res.send({token})
           
   }else{
       const error = new Error('Contraseña incorrecta.')
       error.status = 422
       next(error)
   }
   
}

module.exports = {
    signUp,
    signIn
}