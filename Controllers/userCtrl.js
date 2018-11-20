const Joi = require('joi')
const User  = require('../Models/user1')
const bcrypt = require('bcryptjs')
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).trim().required(),
   
})
async function signUp(req,res){
    try {
        const result = Joi.validate(req.body, schema);
        if(result.error === null){ 
            const user = await User.findOne({username: req.body.username})
            if(user){
                // there is a user with this username
                // response with an error
                res.status(500).send({
                    message: "El nombre de usuario esta actualmente en uso"
                })
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
                    res.status(200).send({
                        username: insertedUser.username,
                        _id: insertedUser._id
                    })
                }

            }
        }else{
            res.send(result)
        }
    } catch (error) {
        res.status(500).send(error)
    }  
}


module.exports = {
    signUp,
}