const Bottle = require('../Models/bottle');
const Brewery = require('../Models/brewery')

async function getBottles(req,res){
    try {
        const bottles = await Bottle.find({}).populate('brewery')

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
async function createBottle(req,res){
    
    try {

        let bottle = new Bottle();
        bottle.beer = req.body.beer;
        bottle.quantity = req.body.quantity;
        bottle.size = req.body.size;
        bottle.ibu = req.body.ibu;
        bottle.alcohol = req.body.alcohol;
        bottle.brewery = req.body.brewery;
        bottle.price = req.body.price;
        const bottleStoraged = await bottle.save()
        res.status(200).send({bottle:bottleStoraged})
            
    } catch (err) {

        res.status(500).send(`Error al guardar las botellas ${err}`)
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
async function updateBottle(req, res){

    try {
        let idBottle = req.params.idBottle
        let dataBottle = req.body
        let bottleUpdated = await Bottle.findByIdAndUpdate(idBottle, dataBottle)
        
        if(!bottleUpdated)
            res.status(404).send('La(s) botellas(s) a actualizar no existe(n)')
        res.status(200).send({
            mensaje:'Botella(s) actualizada(s) correctamente',
            bottle: dataBottle
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar la botella ${error}`)
    }
  
}
module.exports = {
    getBottles,
    createBottle,
    deleteBottle,
    updateBottle,
    getBottle
}