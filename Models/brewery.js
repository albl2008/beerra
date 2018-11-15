const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  name: String,
  address:String,
  contact: [{
    name: String,
    tel: Number,
    mail: String
  }]

});

const Brewery = mongoose.model('brewery', brewerySchema);
module.exports = Brewery;