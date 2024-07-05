// models/QuickLink.js

const mongoose = require('mongoose');

const quickLinkSchema = new mongoose.Schema({
  language: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  serialNumber: { type: Number, required: true },
});

const QuickLink = mongoose.model('QuickLink', quickLinkSchema);

module.exports = QuickLink;
