const express = require('express');
const api = express.Router();
const bottleCtrl = require('../Controllers/bottleCtrl')

api.get('/',bottleCtrl.getBottles);
api.post('/newBottles',bottleCtrl.createBottle);
api.delete('/:idBottle',bottleCtrl.deleteBottle);
api.put('/:idBottle',bottleCtrl.updateBottle);

module.exports = api;