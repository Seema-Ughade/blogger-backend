const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  metaKeywords: { type: String },
  metaDescription: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  cloneForOtherLanguage: { type: Boolean, default: false }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
