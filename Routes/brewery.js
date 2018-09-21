const express = require('express');
const api = express.Router();
const breweryCtrl = require('../Controllers/breweryCtrl')

api.post('/',breweryCtrl.createBrewery);
api.get('/',breweryCtrl.getbreweries)
module.exports = api;