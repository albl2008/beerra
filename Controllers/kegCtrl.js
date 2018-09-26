const Keg = require('../Models/keg');
const Brewery = require('../Models/brewery')

async function getkegs(req,res){
    try {
        const Kegs = await Keg.find({"status" : [ 0,1,2,5 ]}).populate('brewery')

        if(Object.keys(Kegs).length === 0)
            return res.status(404).send({message:'No hay barriles'}); 

        res.status(200).send({Kegs})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function createKeg(req,res){
    
    try {

        let keg = new Keg();
        keg.beer = req.body.beer
        keg.quantity = req.body.quantity
        keg.status = req.body.status
        keg.ibu = req.body.ibu
        keg.alcohol = req.body.alcohol;
        keg.brewery = req.body.brewery;
    
        const kegStoraged = await keg.save()
        res.status(200).send({keg:kegStoraged})
            
    } catch (err) {

        res.status(500).send(`Error al guardar el barril ${err}`)
    }
}
async function deleteKeg(req,res){
    try {
        let idKeg = req.params.idKeg
        let keg = await Keg.findById(idKeg)
        if(!keg)
            res.status(404).send({mensaje:'El barril a eliminar no existe'})
         await keg.remove()
        res.status(200).send({mensaje:'barril eliminado correctamente'})

    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar el barril ${err}`})
    }
}
async function updateKeg(req, res){

    try {
        let idKeg = req.params.idKeg
        let dataKeg = req.body
        let kegUpdated = await Keg.findByIdAndUpdate(idKeg, dataKeg)
        
        if(!kegUpdated)
            res.status(404).send('El barril a actualizar no existe')
        res.status(200).send({
            mensaje:'Barril actualizado correctamente',
            keg: dataKeg
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar barril ${error}`)
    }
  
}
module.exports = {
    getkegs,
    createKeg,
    deleteKeg,
    updateKeg
}