const Joi = require('joi')
const User  = require('../Models/user1')
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).trim().required(),
    email: Joi.string().email()
})
async function signUp(req,res,next){
        console.log(req.body)
        const result = Joi.validate(req.body, schema);
        if(result.error === null){ 
            const user = await User.findOne({username: req.body.username})
            const email = await User.findOne({email: req.body.email})
            if(user){
                // there is a user with this username
                // response with an error
                const e = new Error("El usuario elegido ya existe ")
                e.status = 409
                next(e)
                
            }if(email){
                const e = new Error("El mail elegido ya esta en uso ")
                e.status = 409
                next(e)
            }
            else{
                // hash the password
                hashedPassword = await bcrypt.hash(req.body.password,12)
                //validation secret token
                token = await bcrypt.hash(config.VALIDATE_USER,10)
                // insert the user with the hashed paswsword
               const newUser = new User({
                   username: req.body.username,
                   password: hashedPassword,
                   email:req.body.email,
                   secretToken: token
               })
              const insertedUser = await newUser.save()
                if(insertedUser){
                    const mailOptions = {
                        from: 'marianobuglio@gmail.com', // sender address
                        to: insertedUser.email, // list of receivers
                        subject:'Verificacion de usuario' , // Subject line
                        html: `Ingrese el  token: <strong>${insertedUser.secretToken}</strong> en el siguiente formulario <a href="http://localhost:8080/#/verify">Verificar Cuenta</a> 🍻 `// plain text body
                      };
                    if(sendEmail(insertedUser,mailOptions)){
                        res.status(200).send({
                            message: 'Usuario registrado correctamente ingrese a su email y verifique la cuenta'
                        })
                    }
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
                if(user.verify){

                    const resultPass = await  bcrypt.compare(req.body.password, user.password)
                    console.log(resultPass)
                    if(resultPass){
                        createTokenSendResponse(user, res, next)            
                    }else{
                        const error = new Error('Informacion invalida.')
                        error.status = 422
                        next(error) 
                    }
                }else{
                    const error = new Error('Usuario no verificado.')
                    error.status = 422
                    next(error) 
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
async function verify(req,res,next){
    try {
        
        if(req.body.token){
            const user = await User.findOne({secretToken: req.body.token})
            console.log(user)
            if(user){
                user.verify = true
                user.secretToken = ''
                await user.save()
                res.status(200).send({
                    message: 'usuario verificado correctamente'
                })
            }else{
                const error = new Error('Token invalido')
                next(error)
            }
        }else{
            const error = new Error('Ingrese el token de verificacion')
            next(error)
        } 
    } catch (error) {
        next(error)       
    }
}

async function sendEmail(user,mailOptions){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'marianobuglio@gmail.com',
               pass: '20071993loko7123'
           }
       });
  

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          next(err)
        else
          return true
     });
}
async function ResetTokenSendEmail(req,res,next){
    try {
        if(!req.body.email){
            const error = new Error('ingrese un mail')
            error.status = 400
            next(error)
        }else{
            const user = await User.findOne({email:req.body.email})
            if(user){
                const payload = {
                    _id: user._id,
                    username: user.username
                }
                const token = await jwt.sign(payload,config.TOKEN_SECRET,{
                    expiresIn: '1d'
                })
            if(token){
                user.resetToken = token
                userSaved = await user.save()
            if(userSaved){
                const mailOptions = {
                    from: 'marianobuglio@gmail.com', 
                    to: userSaved.email, 
                    subject:'Restablecer contraseña' , 
                    html: `Ingrese en el siguiente  link para restablecer su contraseña <a href= http://localhost:8080/#/resetPassword/${user.resetToken}>Restablecer contraseña</a>`// plain text body
                };
                if(sendEmail(userSaved.email,mailOptions)){
                    res.status(200).send({
                        message: 'Se ha enviado un link a su mail para restablecer contraseña'
                    })
                }
            }
            }
            }else{
            const error = new Error('No existe usuario con ese email')
            error.status = 404
            next(error)
            }
        } 
    } catch (error) {
        next(error)
    }
}
async function newPassword(req,res,next){
        try {
            const token = req.body.token
            const payload = await jwt.verify(token, config.TOKEN_SECRET)
            if(payload){
                let user = await User.findById(payload._id)
                if(user.resetToken){
                    const hashedPassword =await  bcrypt.hash(req.body.password,12)
                    user.password = hashedPassword
                    user.resetToken =''
                    const userSaved = await user.save()
                    if(userSaved){
                        res.status(200).send({
                            message: 'Contraseña restablecida correctamente'
                        })
                    }
                }else{
                const error = new Error('El token para restablecer la contraseña ya ha sido utilizado')
                error.status = 400
                next(error)
                }
            }else{
                const error = new Error('Token expirado reenvie la solicitud')
                error.status = 400
                next(error)
            }
            
        } catch (error) {
            next(error)
        }
}
module.exports = {
    signUp,
    signIn,
    verify,
    ResetTokenSendEmail,
    newPassword
}