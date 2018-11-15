
/*
function getbrewerys(req,res){
   Keg.find({})
   .then((brewerys)=>{
        if(Object.keys(brewerys).length === 0)
            return res.status(404).send({message:'No hay barriles'});        
        res.status(200).send({brewerys})       
   })
   .catch((err)=>{
    if(err) res.status(500).send(`${err}`);
    
   })
}*/
const Brewery = require('../Models/brewery');

async function updateBrewery(req, res){

    try {
        let idBrewery = req.params.idBrewery
        let dataBrewery = req.body
        let breweryUpdated = await Brewery.findByIdAndUpdate(idBrewery, dataBrewery)
        
        if(!breweryUpdated)
            res.status(404).send('El gasto a actualizar no existe')
        res.status(200).send({
            mensaje:'gasto actualizado correctamente',
            brewery: dataBrewery
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar gasto ${error}`)
    }
  
}

async function deleteBrewery(req,res){
    try {
        let idBrewery = req.params.idBrewery
        let brewery = await Brewery.findById(idBrewery)
        if(!brewery)
            res.status(404).send({mensaje:'El gasto a eliminar no existe'})
         await brewery.remove()
        res.status(200).send({mensaje:'gasto eliminado correctamente'})

    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar el gasto ${err}`})
    }
}
function createBrewery(req,res){
    let brewery = new Brewery();
    brewery.name = req.body.name
    brewery.contact = req.body.contact
    brewery.address = req.body.address
    
    brewery.save()
        .then((breweryStoraged)=>{
            res.status(200).send({brewery:breweryStoraged})
        })
        .catch((err)=>{
            res.status(500).send(`Error al guardar brewery ${err}`)
        })
        


}

async function getBreweries(req, res){
    try {
        
        const Breweries = await Brewery.find({})
        if(Object.keys(Breweries).length === 0)
            res.status(404).send("No existen Fabricas cargadas")
        res.status(200).send({Breweries});
    } catch (error) {
        res.status(500).send({mensaje:`Error al listar las fabricas ${error}`})
    }
   
    
}
async function getBrewery(req, res){
    try {
        let idBrewery = req.params.idBrewery
        const brewery = await Brewery.findById(idBrewery)
        if(!brewery)
            res.status(404).send("No existen Fabricas cargadas")
        res.status(200).send({brewery});
    } catch (error) {
        res.status(500).send({mensaje:`Error al mostrar la fabrica ${error}`})
    }
   
    
}

module.exports = {
    createBrewery,
    getBreweries,
    updateBrewery,
    deleteBrewery,
    getBrewery
}