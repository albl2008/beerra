const Out = require('../Models/coutFlow')
const In = require('../Models/inflow')

async function addInflow(req,res,next){
    try {
        
        let inflow = new In();
        inflow.amount = req.body.amount
        inflow.description = req.body.description
        inflow.date = req.body.date
        await inflow.save()
        res.status(200).send({message:"Ingreso registrado correctamente"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}
async function addOutFlow(req,res,next){
    try {
        let outflow = new Out()
        outflow.amount = req.body.amount
        outflow.description = req.body.description
        outflow.date = req.body.date
        await outflow.save()
        res.status(200).send({message:"Egreso registrado correctamente"})
    } catch (error) {
        next(error)
    }
}
async function getIN(req,res,next){
    try {
        let inflows = await In.find({})
        if(inflows){
            res.status(200).send({inflows})
        }else{
            let err = new Error('No se encontraron ingresos')
            next(err)
        }
    } catch (error) {
        next(error)
    }
}

async function getOUT(req,res,next){
    try {
        let outflows = await Out.find({})
        if(outflows){
            res.status(200).send({outflows})
        }else{
            let err = new Error('No se encontraron egresos')
            next(err)
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {
    addInflow,
    addOutFlow,
    getIN,
    getOUT
}