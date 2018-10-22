const express = require('express');
const api = express.Router();
const breweryCtrl = require('../Controllers/breweryCtrl')

api.post('/newBrewery',breweryCtrl.createBrewery);
api.get('/unique/:idBrewery',breweryCtrl.getBrewery);
api.get('/all',breweryCtrl.getBreweries);
api.put('/:idBrewery',breweryCtrl.updateBrewery);
api.delete('/:idBrewery',breweryCtrl.deleteBrewery);
module.exports = api;