
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
function createBrewery(req,res){
    let brewery = new Brewery();
    brewery.name = req.body.name
    brewery.contact = req.body.contact
    
    
    brewery.save()
        .then((breweryStoraged)=>{
            res.status(200).send({brewery:breweryStoraged})
        })
        .catch((err)=>{
            res.status(500).send(`Error al guardar brewery ${err}`)
        })
        


}

async function getbreweries(req, res){
    try {
        const breweries = await Brewery.find({})
        if(Object.keys(breweries).length === 0)
            res.status(404).send("No existen Fabricas cargadas")
        res.status(200).send({breweries});
    } catch (error) {
        res.status(500).send({mensaje:`Error al listar las fabricas ${error}`})
    }
   
    
}

module.exports = {
    createBrewery,
    getbreweries
}