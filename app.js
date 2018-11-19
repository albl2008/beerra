const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKeg = require('./Routes/keg');
const apiPricize = require('./Routes/pricize')
const apiBrewery = require('./Routes/brewery')
const apiPipe = require('./Routes/pipe');
const apiBottle = require('./Routes/bottle');
const apiSale = require('./Routes/sale');
const apiPayment = require ('./Routes/payment');
const apiOutflow = require('./Routes/outflow');

const api = require('./Routes/index')
const morgan = require('morgan');
const cors = require('cors');




app.use(morgan('dev')); 
app.use(bodyParser.json());

app.use(cors());
app.use('/keg',apiKeg);
app.use('/payment',apiPayment);
app.use('/outflow',apiOutflow);
app.use('/bottle',apiBottle);
app.use('/pipe',apiPipe);
app.use('/brewery',apiBrewery);
app.use('/pricize',apiPricize);
app.use('/sale',apiSale);

app.use('/',api);

module.exports = app;