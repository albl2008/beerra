const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKeg = require('./Routes/keg')
const apiBrewery = require('./Routes/brewery')
const api = require('./Routes/index')
const morgan = require('morgan');
app.use(morgan('dev')); 
app.use(bodyParser.json())
app.use('/keg',apiKeg)
app.use('/brewery',apiBrewery)
app.use('/',api)
module.exports = app;