const Bottle = require('../Models/bottle');
const Brewery = require('../Models/brewery')
const Joi = require('joi')
const schema = Joi.object().keys({
    id: Joi.string(),
    beer: Joi.string().min(2).max(20).required(),
    stock: Joi.number().required(),
    size: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
    ibu: Joi.number().positive().required(),
    alcohol: Joi.number().positive().required(),
    brewery: Joi.string().required(),
  })
async function getBottles(req,res){
    try {
        console.log(req.user._id)
        const bottles = await Bottle.find({user: req.user._id}).populate('brewery')
        if(!bottles)
            return res.status(404).send({message:'No hay botellas'}); 

        res.status(200).send({bottles})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function getBottle(req,res){
    try {
        const bottle = await Bottle.findById(req.params.idBottle)
    if(!bottle)
        res.status(404).send({message:"No se encontro la botella "})
    res.status(200).send({bottle})
    } catch (error) {
        res.status(500).send(`Error al buscar botella ${err}`)
    }
    
}
async function createBottle(req,res,next){
    
    try {
        const result = Joi.validate(req.body,schema)
        if(result.error === null){
                let bottle = new Bottle();
                bottle.beer = req.body.beer;
                bottle.stock = req.body.stock;
                bottle.size = req.body.size;
                bottle.ibu = req.body.ibu;
                bottle.alcohol = req.body.alcohol;
                bottle.brewery = req.body.brewery;
                bottle.price = req.body.price;
                bottle.user = req.user._id
                const bottleStoraged = await bottle.save()
            if(bottleStoraged){
                res.status(200).send({bottle:bottleStoraged})
            }
        }else{
            console.log(result.error.message)
            let error = new Error('Datos ingresados invalidos')
            error.status = 422
            next(error)
        }
    } catch (err) {

       next(err)
    }
}
async function deleteBottle(req,res){
    try {
        let idBottle = req.params.idBottle
        let bottle = await Bottle.findById(idBottle)
        if(!bottle)
            res.status(404).send({mensaje:'La(s) botella(s) a eliminar no existe(n)'})
         await bottle.remove()
        res.status(200).send({mensaje:'Botella(s) eliminada(s) correctamente'})

    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar la(s) botella(s) ${err}`})
    }
}
async function updateBottle(req, res,next){

    try {
        const result = Joi.validate(req.body,schema)
        if(result.error === null){
            let idBottle = req.params.idBottle
            let dataBottle = req.body
            let bottleUpdated = await Bottle.findByIdAndUpdate(idBottle, dataBottle)
            if(!bottleUpdated){
                let error = new Error('Botella a actualizar no encontrada')
                error.status = 422
                next(error)
            }else{
                res.status(200).send({
                    mensaje:'Botella(s) actualizada(s) correctamente',
                    bottle: dataBottle
                })
            }
        }else{
            let error = new Error('Datos ingresados invalidos')
            error.status = 422
            next(error)
        }
    } catch (error) {
        next(error)
    }
  
}
module.exports = {
    getBottles,
    createBottle,
    deleteBottle,
    updateBottle,
    getBottle
}