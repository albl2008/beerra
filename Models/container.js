const mongoose = require('mongoose')
const Schema = mongoose.Schema

const containerSchema = new Schema({
    size:Number,
    stock:Number,
    cost:Number
})

const container = mongoose.model('container',containerSchema)
module.exports = container