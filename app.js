const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiKeg = require('./Routes/keg');
const apiPricize = require('./Routes/pricize')
const apiBrewery = require('./Routes/brewery')
const apiPipe = require('./Routes/pipe');
const apiBottle = require('./Routes/bottle');
const apiSale = require('./Routes/sale');
const apiPayment = require ('./Routes/payment');
const apiOutflow = require('./Routes/outflow');
const apiContainer = require('./Routes/container')
const api = require('./Routes/index')
const cors = require('cors');
const auth = require('./Middelwares/auth1')



app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use(cors());
app.use(auth.checkTocken)


app.use('/keg',apiKeg);
app.use('/payment',apiPayment);
app.use('/outflow',apiOutflow);
app.use('/bottle',apiBottle);
app.use('/pipe',apiPipe);
app.use('/brewery',apiBrewery);
app.use('/pricize',apiPricize);
app.use('/sale',apiSale);
app.use('/container',apiContainer)
app.use('/',api);
app.use(errorHandling)

function errorHandling(error,req,res,next){
    console.log(error.message)
    res.status( error.status || 500)
    res.send(error.message)
}

module.exports = app;