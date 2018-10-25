const Sale = require('../Models/sale')
const Growler = require('../Models/growler')
const Pint = require('../Models/pint')
const format = require('date-format')

async function createSale(req, res) {
   
    try {
        let sale = new Sale()
        sale.client = req.body.client
        sale.totalSale = req.body.totalSale
        sale.date =  req.body.date  
        let saleStoraged = await sale.save()
        saleStoraged = saveProducts(req.body.growlers, req.body.bottles, req.body.pints, saleStoraged)
        res.status(200).send({
            message: "Venta realizada correctamente",

        })
    } catch (error) {
        res.status(500).send(`Error al procesar la venta  ${error}`)
    }
} 
async function getGrowler(req,res){
    try {
        let sale = Sale.findById(req.params.idSale)
        if(!sale)
            res.status(404).send({mensaje:"No se encontro la venta buscada"})
        res.status(200).send({sale})
    } catch (error) {
        res.status(500).send(`Error al buscar la venta  ${error}`)
    }
   
}
async function saveProducts(growlers, bottles, pints, saleStoraged) {

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

        }
    }
    if (pints) {
        for (const element of pints) {
            pint = new Pint()
            pint.keg = element.keg
            pint.quantity = element.quantity
            pint.price = element.price
            pint.size = element.size
            pint.sale = saleStoraged._id
            await pint.save()
            await saleStoraged.pints.push(pint)
            await saleStoraged.save()
        }
    }
    if (bottles) {
        for (const element of bottles) {
            await saleStoraged.bottles.push(element)
            await saleStoraged.save()
        }
    }
    return saleStoraged;
}
async function getSales(req, res) {
    const sales = await Sale.find({}).populate('growlers').populate('pints').populate('bottles')
    if (!sales)
        res.status(404).send({
            message: "No se encontraron ventas"
        })
    res.status(200).send({
        sales
    })

}

module.exports = {
    createSale,
    getSales,
    getGrowler

}