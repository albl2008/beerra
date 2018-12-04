

const Brewery = require('../Models/brewery');
const Joi = require('joi')

const schema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().min(3).max(20).required(),
    contact: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      tel: Joi.number().required(),
      mail: Joi.string().email().required(),
    })).min(1).required(),
    address : Joi.string().min(5).max(30).required()
  })
async function updateBrewery(req, res,next){

    try {
        const result = Joi.validate(req.body,schema)
        if(result.error === null){
            let idBrewery = req.params.idBrewery
            let dataBrewery = req.body
            let breweryUpdated = await Brewery.findByIdAndUpdate(idBrewery, dataBrewery)
            
            if(!breweryUpdated)
                res.status(404).send('El gasto a actualizar no existe')
            res.status(200).send({
                mensaje:'gasto actualizado correctamente',
                brewery: dataBrewery
            })
        }else{
            console.log(result.error.message)
            let error = new Error('Los datos ingresados son invalidos')
            error.status = 422
            next(error)
        }
    } catch (error) {
        res.status(500).send(`Error al actualizar gasto ${error}`)
    }
  
}

async function deleteBrewery(req,res){
    try {
        let idBrewery = req.params.idBrewery
        let brewery = await Brewery.findById(idBrewery)
        if(!brewery)
          return  res.status(404).send({mensaje:'Cerveceria a eliminar no existe'})
        await brewery.remove()
        res.status(200).send({mensaje:'Cerveceria eliminada correctamente'})

    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar el gasto ${err}`})
    }
}
async function createBrewery(req,res,next){
try {
    const result = Joi.validate(req.body,schema)
    if(result.error === null){
        let brewery = new Brewery();
        brewery.name = req.body.name
        brewery.contact = req.body.contact
        brewery.address = req.body.address
        brewery.user = req.user._id
        const breweryStoraged =await brewery.save()
        if(breweryStoraged){
            res.status(200).send({brewery:breweryStoraged})
        }
    }else{
        console.log(result.error.message)
        let error = new Error('Los datos ingresados son invalidos')
        error.status = 422
        next(error)
    }
} catch (error) {
    next(error)
}
       
        


}

async function getBreweries(req, res,next){
    try {
        
        const Breweries = await Brewery.find({user:req.user._id})
        if(Object.keys(Breweries).length === 0){
            let error = new Error('No existen cervecerias')
            error.status = 404
            next(error)
        }

            res.status(200).send({Breweries});
        
    } catch (error) {
     
            
            next(error)
    }
   
    
}
async function getBrewery(req, res, next){
    try {
        let idBrewery = req.params.idBrewery
        const brewery = await Brewery.findById(idBrewery)
        if(!brewery){
            let error = new Error('No existe cervezeria a eliminar')
            error.status = 404
            next(error)
        }
        res.status(200).send({brewery});
    } catch (error) {
        
        next(error)
    }
   
    
}

module.exports = {
    createBrewery,
    getBreweries,
    updateBrewery,
    deleteBrewery,
    getBrewery
}