// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  metaKeywords: String,
  metaDescription: String,
  thumbnailImage: String // Assuming you store the path to the image
});

module.exports = mongoose.model('Post', postSchema);
