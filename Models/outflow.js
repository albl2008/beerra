const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outflowSchema = new Schema({
  name: String,
  type: {
   type : Number,
   required: [true, 'Ingrese el tipo de gasto']
  },
  quantity: String,
  unity: String,
  price: Number,
  date: Date
});

const Outflow = mongoose.model('outflow', outflowSchema);
module.exports = Outflow;