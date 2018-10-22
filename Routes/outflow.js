const express = require('express');
const api = express.Router();
const outflowCtrl = require('../Controllers/outflowCtrl')

api.get('/all',outflowCtrl.getOutflows);
api.get('/unique/:idOutflow',outflowCtrl.getOutflow);
api.post('/newOutflow',outflowCtrl.createOutflow);
api.delete('/:idOutflow',outflowCtrl.deleteOutflow);
api.put('/:idOutflow',outflowCtrl.updateOutflow)
module.exports = api;