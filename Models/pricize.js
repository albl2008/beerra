const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pricizeSchema = new Schema({
    growlerprice:Number,
    growlerprice2:Number,
    pintprice:Number,
    pintprice2:Number,
    loadprice:Number,
    loadprice2:Number,
    hhourprice:Number
})

const pricize = mongoose.model('pricize',pricizeSchema)
module.exports = pricize