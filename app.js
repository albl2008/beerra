const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKeg = require('./Routes/keg')
const apiBrewery = require('./Routes/brewery')
const apiPipe = require('./Routes/pipe');
const apiBottle = require('./Routes/bottle');
const apiOutflow = require('./Routes/outflow');
const {authjwt} = require ('./Services/passport');
const api = require('./Routes/index')
const morgan = require('morgan');
const cors = require('cors');

const passport = require ('passport');
app.use(passport.initialize())



app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use('/keg',authjwt,apiKeg);
app.use('/outflow',apiOutflow);
app.use('/bottle',apiBottle);
app.use('/pipe',apiPipe);
app.use('/brewery',authjwt,apiBrewery);
app.use('/',api);


module.exports = app;