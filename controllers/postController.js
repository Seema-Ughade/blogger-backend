const Post = require('../models/Post');
const path = require('path');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts. Please try again.' });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error finding post by ID:', error);
    res.status(500).json({ error: 'Failed to fetch post. Please try again.' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { serialNumber, title, category, author, content, metaKeywords, metaDescription } = req.body;
  const imagePath = req.file ? req.file.path : null; // Path to uploaded file

  const newPost = new Post({
    serialNumber,
    title,
    category,
    author,
    content,
    metaKeywords,
    metaDescription,
    thumbnailImage: imagePath ? imagePath : null // Save path or null if no image uploaded
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post. Please try again.' });
  }
};

// Update an existing post
exports.updatePost = async (req, res) => {
  const { serialNumber, title, category, author, content, metaKeywords, metaDescription } = req.body;
  const imagePath = req.file ? req.file.path : null; // Path to uploaded file

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      serialNumber,
      title,
      category,
      author,
      content,
      metaKeywords,
      metaDescription,
      thumbnailImage: imagePath ? imagePath : null // Update image path if uploaded
    }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post. Please try again.' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post. Please try again.' });
  }
};
