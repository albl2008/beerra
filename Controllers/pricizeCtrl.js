const Pricize = require('../Models/pricize');




async function getPricizes(req, res) {
    const Pricizes = await Pricize.find({})
    if (!Pricizes)
        res.status(404).send({
            message: "No se encontraron pagos"
        })
    res.status(200).send({
        Pricizes
    })

}
async function getPricize(req,res){
    try {
        const pricize = await Pricize.findById(req.params.idPricize)
        if(Object.keys(pricize).length === 0)
            return res.status(404).send({message:'No se encontraron precios-tamaños'}); 

        res.status(200).send({pricize})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}


async function addPricize(req,res){
    
    try {
        console.log(req.body)
        let pricize = new Pricize();
        pricize.growlerprice = req.body.growlerprice
        pricize.growlerprice2 = req.body.growlerprice2
        pricize.pintprice = req.body.pintprice
        pricize.pintprice2 = req.body.pintprice2
        pricize.loadprice = req.body.loadprice
        pricize.loadprice2 = req.body.loadprice2
        pricize.hhourprice = req.body.hhourprice
        
        const pricizeStoraged = await pricize.save()
        res.status(200).send({pricize:pricizeStoraged})
            
    } catch (err) {

        res.status(500).send(`Error al guardar precios y tamaños ${err}`)
    }
}

async function updatePricize(req, res){

    try {
        let idPricize = req.params.idPricize
        let dataPricize = req.body
        let pricizeUpdated = await Pricize.findByIdAndUpdate(idPricize, dataPricize)
        
        if(!pricizeUpdated)
            res.status(404).send('Los precios a actualizar no existen')
        res.status(200).send({
            mensaje:'Precios y tamaños actualizados correctamente',
            pricize: dataPricize
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar ${error}`)
    }
  
}





const Size = require('../Models/size');




async function getSizes(req, res) {
    const Sizes = await Size.find({})
    if (!Sizes)
        res.status(404).send({
            message: "No se encontraron tamaños"
        })
    res.status(200).send({
        Sizes
    })

}
async function getSize(req,res){
    try {
        const size = await Size.findById(req.params.idSize)
        if(Object.keys(size).length === 0)
            return res.status(404).send({message:'No se encontraron tamaños'}); 

        res.status(200).send({size})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}


async function addSize(req,res){
    
    try {
        console.log(req.body)
        let size = new Size();
        size.growlersize= req.body.growlersize
        size.growlersize2 = req.body.growlersize2
        size.pintsize = req.body.pintsize
        size.pintsize2 = req.body.pintsize2
        
        const sizeStoraged = await size.save()
        res.status(200).send({size:sizeStoraged})
            
    } catch (err) {

        res.status(500).send(`Error al guardar precios y tamaños ${err}`)
    }
}

async function updateSize(req, res){

    try {
        let idSize = req.params.idSize
        let dataSize = req.body
        let sizeUpdated = await Size.findByIdAndUpdate(idSize, dataSize)
        
        if(!sizeUpdated)
            res.status(404).send('Los precios a actualizar no existen')
        res.status(200).send({
            mensaje:'Precios y tamaños actualizados correctamente',
            size: dataSize
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar ${error}`)
    }
  
}


module.exports = {
    getPricize,
    getPricizes,
    addPricize,
    updatePricize,
    getSize,
    getSizes,
    addSize,
    updateSize
}