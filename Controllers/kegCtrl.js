const Keg = require('../Models/keg');
const Brewery = require('../Models/brewery')
const Growler = require('../Models/growler')
const Other = require('../Models/other')
const Pint = require('../Models/pint')

async function getkegs(req,res){
    try {
        const Kegs = await Keg.find({"sta" : [ 1,2,3,4 ]}).populate('brewery')

        if(Object.keys(Kegs).length === 0)
            return res.status(404).send({message:'No hay barriles'}); 

        res.status(200).send({Kegs})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function getkeg(req,res){
    try {
        const keg = await Keg.findById(req.params.idKeg).populate('brewery')
        
        if(Object.keys(keg).length === 0)
            return res.status(404).send({message:'No se encontro el barril seleccionado'}); 
        const sale = await verifySale(keg._id)

        res.status(200).send({
            keg,
            sale: sale
        })     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function createKeg(req,res){
    
    try {

        let keg = new Keg();
        keg.beer = req.body.beer
        keg.sta = req.body.sta
        if(keg.sta === 2) 
            keg.quantitySaled = req.body.quantitySaled 
        else
            keg.quantitySaled = req.body.quantity
        keg.quantity = req.body.quantity
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
       let verify = await verifySale(req.params.idKeg)
       console.log(verify)
    if(verify){
        let idKeg = req.params.idKeg
        let keg = await Keg.findById(idKeg)
        if(!keg)
            res.status(404).send({mensaje:'El barril a eliminar no existe'})
         await keg.remove()
        res.status(200).send({mensaje:'barril eliminado correctamente'})
        }else{
            res.status(200).send({mensaje:'No es posible eliminar este barril ya que se han realizado ventas'})
        }
    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar el barril ${err}`})
    }
}
async function verifySale(idKeg){
    let growler = await Growler.find({keg: idKeg})
    let pint = await Pint.find({keg:idKeg})
    let other = await Other.find({keg:idKeg})
    
    if(Object.keys(growler).length != 0 ){
        return false
    }
    else if(Object.keys(pint).length != 0 ){        
        return false
    }
    else if(Object.keys(other).length != 0 ){      
        return false       
    }    
    else
        return true
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
async function connect(req,res){
    try {
        let idKeg = req.params.idKeg
        let connectedKeg = await Keg.findByIdAndUpdate(idKeg, {$set:{sta:4 }},{new:true})
        if(!connectedKeg)
            res.status(404).send({mensaje: 'No se encontro el barril a conectar'})
        res.status(200).send({
            mensaje:'Barril conectado',
            connectedKeg   
    })
    } catch (error) {
        res.status(500).send(`Error al conectar barril ${error}`)
    }
}
async function disconect(req,res){
    try {
        let idKeg = req.params.idKeg       
        let connectedKeg = await Keg.findById(idKeg)
        if(!connectedKeg)
            res.status(404).send({mensaje: 'No se encontro el barril a conectar'})

        if(connectedKeg.quantitySaled === connectedKeg.quantity)
            connectedKeg.sta = 1
        else
            connectedKeg.sta = 2

        await connectedKeg.save()
        res.status(200).send({
            mensaje:'Barril conectado',
            connectedKeg   
    })
    } catch (error) {
        res.status(500).send(`Error al conectar barril ${error}`)
    }
}
async function empty(req,res){
    try {
        let idKeg = req.params.idKeg
        let disconect = await Keg.findByIdAndUpdate(idKeg, {$set:{sta:3 }},{new:true})
        if(!disconect)
            res.status(404).send({mensaje: 'No se encontro el barril a desconectar'})
        res.status(200).send({
            mensaje:'Barril desconectado',
            disconect   
    })
    } catch (error) {
        res.status(500).send(`Error al conectar barril ${error}`)
    }
}
module.exports = {
    getkegs,
    createKeg,
    deleteKeg,
    updateKeg,
    getkeg,
    connect,
    empty,
    disconect
}