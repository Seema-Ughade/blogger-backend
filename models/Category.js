// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  status: String,
  serialNumber: Number,
  image: String
});

module.exports = mongoose.model('Category', categorySchema);
