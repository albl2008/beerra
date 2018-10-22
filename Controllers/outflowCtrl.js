const Outflow = require('../Models/outflow');
const Brewery = require('../Models/brewery')

async function getOutflows(req,res){
    try {
        const Outflows = await Outflow.find({})

        if(Object.keys(Outflows).length === 0)
            return res.status(404).send({message:'No hay gastos'}); 

        res.status(200).send({Outflows})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function getOutflow(req,res){
    try {
        let idOutflow = req.params.idOutflow
        const outflow = await Outflow.findById(idOutflow)

        if(Object.keys(outflow).length === 0)
            return res.status(404).send({message:'No hay gastos'}); 

        res.status(200).send({outflows})     
    } catch (err) {
        res.status(500).send(`${err}`);
    }
   
   
}
async function createOutflow(req,res){
    
    try {

        let outflow = new Outflow();
        outflow.name = req.body.name
        outflow.quantity = req.body.quantity
        outflow.type = req.body.type
        outflow.price = req.body.price
        outflow.unity = req.body.unity
    
        const outflowStoraged = await outflow.save()
        res.status(200).send({outflow:outflowStoraged})
            
    } catch (err) {

        res.status(500).send(`Error al guardar el gasto ${err}`)
    }
}
async function deleteOutflow(req,res){
    try {
        let idOutflow = req.params.idOutflow
        let outflow = await Outflow.findById(idOutflow)
        if(!outflow)
            res.status(404).send({mensaje:'El gasto a eliminar no existe'})
         await outflow.remove()
        res.status(200).send({mensaje:'gasto eliminado correctamente'})

    } catch (err) {
        res.status(500).send({mensaje:`Error al eliminar el gasto ${err}`})
    }
}
async function updateOutflow(req, res){

    try {
        let idOutflow = req.params.idOutflow
        let dataOutflow = req.body
        let outflowUpdated = await Outflow.findByIdAndUpdate(idOutflow, dataOutflow)
        
        if(!outflowUpdated)
            res.status(404).send('El gasto a actualizar no existe')
        res.status(200).send({
            mensaje:'gasto actualizado correctamente',
            outflow: dataOutflow
        })
    } catch (error) {
        res.status(500).send(`Error al actualizar gasto ${error}`)
    }
  
}
module.exports = {
    getOutflows,
    getOutflow,
    createOutflow,
    deleteOutflow,
    updateOutflow
}