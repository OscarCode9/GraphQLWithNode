const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorchema = new Schema({
  name: String, 
  age: Number
}); 

module.exports = mongoose.model('Author', authorchema);

