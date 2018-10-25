const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bottleSchema = new Schema({
  beer: {
   type : String,
   required: [true, 'Ingrese el estilo']
  },
  quantity: Number,
  size: Number,
  ibu: Number,
  alcohol: Number,
  price:Number,
  brewery: {
    type: Schema.Types.ObjectId,
    ref: 'brewery'
  }
  });

const Bottle = mongoose.model('bottle', bottleSchema);
module.exports = Bottle;