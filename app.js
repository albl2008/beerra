const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiKeg = require('./Routes/keg')
const apiBrewery = require('./Routes/brewery')
const apiPipe = require('./Routes/pipe');
const apiBottle = require('./Routes/bottle');
const apiSale = require('./Routes/sale');
const apiOutflow = require('./Routes/outflow');
const api = require('./Routes/index')
const cors = require('cors');
const auth = require('./Middelwares/auth1')



app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use(cors());
app.use(auth.checkTocken)


app.use('/keg',apiKeg);
app.use('/outflow',apiOutflow);
app.use('/bottle',apiBottle);
app.use('/pipe',apiPipe);
app.use('/brewery',apiBrewery);
app.use('/sale',apiSale);
app.use('/',api);
app.use(errorHandling)

function errorHandling(error,req,res,next){
    console.log(error.message)
    res.status( error.status || 500)
    res.send(error.message)
}

module.exports = app;