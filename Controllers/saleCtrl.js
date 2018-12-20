const Sale = require('../Models/sale')
const Growler = require('../Models/growler')
const Pint = require('../Models/pint')
const Other = require('../Models/other')
const Keg = require('../Models/keg')
const Bottle = require('../Models/bottle')
const BottleSale = require('../Models/bottleSale')
const Container = require('../Models/container')
const ContainerSale = require('../Models/containerSale')
const format = require('date-format')
const mongoose = require('mongoose')
async function createSale(req, res) {
   
    try {
        let sale = new Sale()
        sale.client = req.body.client
        sale.totalSale = req.body.totalSale
        sale.date =  req.body.date  
        sale.user = req.user._id
        let saleStoraged = await sale.save()
        saleStoraged = saveProducts(req.body.growlers, req.body.bottles, req.body.pints, req.body.others,saleStoraged,req.body.containers)
        res.status(200).send({
            message: "Venta realizada correctamente",

        })
    } catch (error) {
        res.status(500).send(`Error al procesar la venta  ${error}`)
    }
} 
async function getGrowler(req,res){
    try {
        let growlers = await Growler.find({"sale":req.params.idSale}).populate('keg')
        if(!growlers)
            res.status(404).send({mensaje:"La venta no tiene growlers"})
        res.status(200).send({growlers})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
        console.log(error)
    }
   
}
async function getPint(req,res){
    try {   
        let pints = await Pint.find({"sale":req.params.idSale}).populate('keg')
        if(!pints)
            res.status(404).send({mensaje:"La venta no tiene pintas"})
        res.status(200).send({pints})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
        console.log(error)
    }
   
}
async function getOther(req,res){
    try {   
        let others = await Other.find({"sale":req.params.idSale}).populate('keg').populate('others')
        if(!others)
            res.status(404).send({mensaje:"La venta no tiene otros"})
        res.status(200).send({others})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
        console.log(error)
    }
   
}
async function getBottle(req,res){
    try {
        let bottles = await BottleSale.find({sale:req.params.idSale}).populate('bottle  ')
        if(!bottles)
            res.status(404).send({mensaje:"La venta no tiene botellas"})
        res.status(200).send({bottles})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
        console.log(error)
    }
   
}
async function getContainer(req,res){
    try {
        let containers = await ContainerSale.find({sale:req.params.idSale}).populate('container')
        if(!containers)
            res.status(404).send({mensaje:"La venta no tiene envases"})
        res.status(200).send({containers})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
        console.log(error)
    }
   
}
async function saveProducts(growlers, bottles, pints,other, saleStoraged, containers) {

    if (growlers) {
        for (const element of growlers) {
            growler = new Growler()
            growler.keg = element.keg
            growler.quantity = element.quantity
            growler.price = element.price
            growler.sale = saleStoraged._id
            await growler.save()
            await saleStoraged.growlers.push(growler)
            await saleStoraged.save()
            if(saleStoraged){
                let keg = await Keg.findById(element.keg)
                keg.quantitySaled = (keg.quantitySaled - element.quantity)
                await keg.save()
            }
        }
    }
    if (pints) {
        for (const element of pints) {
            let pint = new Pint()
            pint.keg = element.keg
            pint.quantity = element.quantity
            pint.price = element.price
            pint.sale = saleStoraged._id
            await pint.save()
            await saleStoraged.pints.push(pint)
            await saleStoraged.save()
            if(saleStoraged){
                let keg = await Keg.findById(element.keg)
                keg.quantitySaled = (keg.quantitySaled - element.quantity)
                await keg.save()
            }
        }
    }
    if (bottles) {
        for (const element of bottles) {
            let bottle = await Bottle.findById(element._id)
            bottle.stock -= element.quantitySaled
            let bottleSale = new BottleSale()
            bottleSale.bottle = element._id
            bottleSale.sale = saleStoraged._id
            bottleSale.quantitySaled = element.quantitySaled
            bottleSale.unitPrice = element.unitPrice
            bottleSale.totalPrice = element.price
            await bottle.save()
            await bottleSale.save()
            await saleStoraged.bottles.push(bottleSale)
            await saleStoraged.save()
        }
    }
    if(other){
        for(const element of other){
            let other = new Other()
            other.keg = element.keg
            other.quantity = element.quantity
            other.price = element.price
            other.sale = saleStoraged._id
            await other.save()
            await saleStoraged.others.push(other)
            await saleStoraged.save()
            if(saleStoraged){
                let keg = await Keg.findById(element.keg)
                keg.quantitySaled = (keg.quantitySaled - element.quantity)
                await keg.save()
            }
        }
    }
    if (containers) {
        for (const element of containers) {
            let container = await Container.findById(element._id)
            container.stock -= element.quantitySaled
            let containerSale = new ContainerSale()
            containerSale.container = element._id
            containerSale.sale = saleStoraged._id
            containerSale.quantitySaled = element.quantitySaled
            containerSale.totalPrice = element.price
            containerSale.unitPrice = element.cost
            await container.save()
            await containerSale.save()
            await saleStoraged.containers.push(containerSale)
            await saleStoraged.save()
        }
    }
    return saleStoraged;
}

async function getSales(req, res) {
    const sales = await Sale.find({user: req.user._id}).sort({date: -1}).populate('client')
    if (!sales){
        res.status(404).send({
            message: "No se encontraron ventas"
        })}
    res.status(200).send({
        sales
    })

}
async function getSalesofClient(req, res) {
    const Sales = await Sale.find({"client":req.params.idClient}).populate('client').populate('growlers').populate('pints')
    if (!Sales)
        res.status(404).send({
            message: "No se encontraron ventas"
        })
    res.status(200).send({
        Sales
    })
}
// Reportes

async function salesForMonth(req,res,next){
    try {    
        const sales = await Sale.aggregate(
            [   
               
                 
                {
                $match:{
                    user: mongoose.Types.ObjectId(req.user._id)
                    }
              },
                {
                $group: {
                  _id : { year: { $year : "$date" }, month: { $month : "$date" }}, 
                       count : { $sum : 1 }
                  }
                },
                {
                    $sort: { "_id.month": 1}
                }
            ]
        )
        if(sales){
            res.status(200).send({sales})
        }
    } catch (error) {
       next(error)  
    }
}

async function TypesForMonth(req,res,next){
    try {    
        const sales = await Sale.aggregate(
           [
             {
                $match:{ user: mongoose.Types.ObjectId(req.user._id)}
             },
             {
                  $group: {
                           _id : { year: { $year : "$date" }, month: { $month : "$date" }}, 
                           growlers:{$sum: {$size :"$growlers"}},
                           pints:{$sum: {$size :"$pints"}},
                           others:{$sum: {$size :"$others"}},
                           bottles:{$sum: {$size :"$bottles"}},
                          }
             },
             {
                $sort: { "_id.month": 1}
            }
           ]
        )
        if(sales){
            res.status(200).send({sales})
        }
    } catch (error) {
       next(error)  
    }
}

async function litresForMonth(req,res,next){
    try {
        
        
        const sales = await Sale.aggregate(
            [
                {
                    $match: { user: mongoose.Types.ObjectId(req.user._id)}
                },
                
                
                {
                    $lookup: {
                        from: "others",
                        localField: "others",
                        foreignField: "_id",
                        as: "others"
                    }
                },
                {$unwind: {path:"$others",
                preserveNullAndEmptyArrays: true}   
            },
            {
                $lookup: {
                    from: "pints",
                    localField: "pints",
                    foreignField: "_id",
                    as: "pints"
                }
            },
            {$unwind: {path:"$pints",
            preserveNullAndEmptyArrays: true}
        },
        
        {
            $lookup: {
                from: "growlers",
                localField: "growlers",
                foreignField: "_id",
                as: "growlers"
            }
        },
        {$unwind: {path:"$growlers",
        preserveNullAndEmptyArrays: true}
    },
    
    
    {
        $group:{ _id: {year:{$year:"$date"},month: { $month : "$date" }},
        count:{ $sum: {
            $add: [
                { $ifNull: ["$pints.quantity", 0] },
                { $ifNull: ["$others.quantity", 0] },
                { $ifNull: ["$growlers.quantity", 0] }
            ]      
        }} ,
        
        
    }
},

{
    $sort: { "_id.month": 1}
}

]
)

if(sales){
    res.status(200).send({sales})
}
} catch (error) {
    next(error)
}

    }
    module.exports = {
        createSale,
        getSales,
        getGrowler,
        getPint,
        getBottle,
        getOther,
        getContainer,
        salesForMonth,
        TypesForMonth,
        litresForMonth,
        getSalesofClient

    }
