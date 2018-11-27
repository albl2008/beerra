const mongoose = require('mongoose')
const Schema = mongoose.Schema

    
const saleSchema = new Schema({
    client: String,
    growlers:[{
       
        type: Schema.Types.ObjectId,
        ref:'growler'
        
    }],  
    pints:[{
       
        type: Schema.Types.ObjectId,
        ref:'pint'
        
    }],  
    bottles:[{
       
        type: Schema.Types.ObjectId,
        ref:'bottleSale'
        
    }],
    others:[{
        type: Schema.Types.ObjectId,
        ref:'other'
    }],
    containers:[{
        type: Schema.Types.ObjectId,
        ref:'containerSale'
    }],
    date:Date,
    totalSale:Number,
})


const Sale = mongoose.model('sale',saleSchema)
module.exports = Sale