const express = require('express');
const api = express.Router();
const outflowCtrl = require('../Controllers/outflowCtrl')

api.get('/',outflowCtrl.getOutflows);
api.get('/:idOutflow',outflowCtrl.getOutflow);
api.post('/',outflowCtrl.createOutflow);
api.delete('/:idOutflow',outflowCtrl.deleteOutflow);
api.put('/:idOutflow',outflowCtrl.updateOutflow)

module.exports = api;