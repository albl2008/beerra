const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  name: String,
  contact: [{
    nameC: String,
    tel: Number,
    mail: String
  }]

});

const Brewery = mongoose.model('brewery', brewerySchema);
module.exports = Brewery;