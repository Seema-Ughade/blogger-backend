const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
const Post = require('../models/Post'); // Adjust the path based on your project structure

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('uploads', '../uploads')); // Specify upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Import controller functions
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Define routes
router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', upload.single('image'), createPost);

router.put('/:id', upload.single('image'), updatePost);

router.delete('/:id', deletePost);

module.exports = router;
