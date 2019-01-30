const mongoose = require('mongoose')
const Schema = mongoose.Schema

const outflowSchema = new Schema({
    amount: Number,
    description: String,
    date: Date,
    outflow : {
        type: Schema.Types.ObjectId,
        ref: 'outflow'
    },
    payment:{
        type: Schema.Types.ObjectId,
        ref: 'payment'
    }

})

const CoutFlow = mongoose.model('coutflow', outflowSchema)
module.exports = CoutFlow
