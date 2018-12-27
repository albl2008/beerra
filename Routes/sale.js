const express = require('express')
const api = express.Router()
const saleController = require('../Controllers/saleCtrl')

api.post('/',saleController.createSale)
api.get('/',saleController.getSales)
api.get('/growlers/:idSale/',saleController.getGrowler)
api.get('/pints/:idSale/',saleController.getPint)
api.get('/bottles/:idSale/',saleController.getBottle)
api.get('/other/:idSale/',saleController.getOther)
api.get('/containers/:idSale/',saleController.getContainer)
api.get('/salesformonth', saleController.salesForMonth)
api.get('/typesformonth', saleController.TypesForMonth)
api.get('/litresformonth', saleController.prueba)
api.get('/counter/:idClient/',saleController.getSalesofClient)



module.exports = api