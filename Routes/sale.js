const express = require('express')
const api = express.Router()
const saleController = require('../Controllers/saleCtrl')

api.post('/',saleController.createSale)
api.get('/',saleController.getSales)
api.get('/:idSale',saleController.getSales)

module.exports = api