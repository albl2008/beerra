const User = require('../Models/user');
const bcrypt = require('bcryptjs');

module.exports.getUserById = function(id,cb){
    User.find({});

}

async function getUserByEmail(email){
    try{

    
    await User.findOne({email:email});
    res.send(user);

    }
    catch(err){
        res.status(500).send(`Error al guardar el usuario ${err}`)
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

async function comparePassword (myPassword,hash){
    bcrypt.compare(myPassword,hash,function(err,isMatch){
        if(err) throw err;
        await (null,isMatch)
    })
}
module.exports={
    createUser,
    getUserByEmail,
    comparePassword
}