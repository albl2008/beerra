const express = require('express');
const api = express.Router();
const kegCtrl = require('../Controllers/kegCtrl')

api.get('/',kegCtrl.getkegs);
api.post('/',kegCtrl.createKeg);
api.delete('/:idKeg',kegCtrl.deleteKeg);
api.put('/:idKeg',kegCtrl.updateKeg)
module.exports = api;