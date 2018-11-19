const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
    growlersize:Number,
    growlersize2:Number,
    pintsize:Number,
    pintsize2:Number
    
})

const size = mongoose.model('size',sizeSchema)
module.exports = size