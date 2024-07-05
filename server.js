// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI;
// const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
// const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
// const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: CLOUDINARY_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET
// });

// // MongoDB Connection
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Define Category Schema and Model
// const categorySchema = new mongoose.Schema({
//   name: String,
//   status: String,
//   serialNumber: Number,
//   image: String
// });

// const Category = mongoose.model('Category', categorySchema);

// // Define Post Schema and Model
// const postSchema = new mongoose.Schema({
//   serialNumber: { type: Number, required: true },
//   title: { type: String, required: true },
//   category: { type: String, required: true },
//   author: { type: String, required: true },
//   content: { type: String, required: true },
//   metaKeywords: String,
//   metaDescription: String,
//   thumbnailImage: String // Assuming you store the path to the image
// });

// const Post = mongoose.model('Post', postSchema);

// // Middleware for handling multipart/form-data (file uploads)
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/'); // Directory to save uploaded files
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5 // 5MB file size limit (adjust as necessary)
//   }
// });

// // API Endpoints

// // Category APIs

// // Add a new category
// app.post('/api/categories', async (req, res) => {
//   try {
//     const { name, status, serialNumber, image } = req.body;

//     const newCategory = new Category({
//       name,
//       status,
//       serialNumber,
//       image,
//     });

//     const savedCategory = await newCategory.save();

//     res.status(201).json(savedCategory);
//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(500).json({ error: 'Failed to add category' });
//   }
// });

// // Get all categories
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ error: 'Failed to fetch categories' });
//   }
// });

// // Delete a category by ID
// app.delete('/api/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(id);
//     if (!deletedCategory) {
//       return res.status(404).json({ error: 'Category not found' });
//     }
//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     res.status(500).json({ error: 'Failed to delete category' });
//   }
// });

// // Update a category by ID
// app.put('/api/categories/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, status, serialNumber, image } = req.body;

//   try {
//     const updatedCategory = await Category.findByIdAndUpdate(id, {
//       name,
//       status,
//       serialNumber,
//       image,
//     }, { new: true });

//     if (!updatedCategory) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     res.status(200).json(updatedCategory);
//   } catch (error) {
//     console.error('Error updating category:', error);
//     res.status(500).json({ error: 'Failed to update category' });
//   }
// });

// // Post APIs

// // Get all posts
// app.get('/api/posts', (req, res) => {
//   Post.find()
//     .then(posts => res.json(posts))
//     .catch(err => {
//       console.error('Error fetching posts:', err);
//       res.status(500).json({ error: 'Failed to fetch posts. Please try again.' });
//     });
// });

// // Get single post by ID
// app.get('/api/posts/:id', (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => {
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
//       res.json(post);
//     })
//     .catch(err => {
//       console.error('Error finding post by ID:', err);
//       res.status(500).json({ error: 'Failed to fetch post. Please try again.' });
//     });
// });

// // Create a new post
// app.post('/api/posts', upload.single('thumbnailImage'), (req, res) => {
//   const { serialNumber, title, category, author, content, metaKeywords, metaDescription } = req.body;
//   const imagePath = req.file ? req.file.path : null; // Path to uploaded file

//   const newPost = new Post({
//     serialNumber,
//     title,
//     category,
//     author,
//     content,
//     metaKeywords,
//     metaDescription,
//     thumbnailImage: imagePath ? imagePath : null // Save path or null if no image uploaded
//   });

//   newPost.save()
//     .then(post => res.json(post))
//     .catch(err => {
//       console.error('Error saving post:', err);
//       res.status(500).json({ error: 'Failed to save post. Please try again.' });
//     });
// });

// // Update an existing post
// app.put('/api/posts/:id', upload.single('thumbnailImage'), (req, res) => {
//   const { serialNumber, title, category, author, content, metaKeywords, metaDescription } = req.body;
//   const imagePath = req.file ? req.file.path : null; // Path to uploaded file

//   Post.findById(req.params.id)
//     .then(post => {
//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }

//       // Update fields
//       post.serialNumber = serialNumber;
//       post.title = title;
//       post.category = category;
//       post.author = author;
//       post.content = content;
//       post.metaKeywords = metaKeywords;
//       post.metaDescription = metaDescription;
//       post.thumbnailImage = imagePath ? imagePath : post.thumbnailImage; // Preserve existing image if no new image uploaded

//       // Save updated post
//       post.save()
//         .then(updatedPost => res.json(updatedPost))
//         .catch(err => {
//           console.error('Error updating post:', err);
//           res.status(500).json({ error: 'Failed to update post. Please try again.' });
//         });
//     })
//     .catch(err => {
//       console.error('Error finding post by ID:', err);
//       res.status(500).json({ error: 'Failed to update post. Please try again.' });
//     });
// });

// // Delete a post
// app.delete('/api/posts/:id', (req, res) => {
//   Post.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ message: 'Post deleted successfully' }))
//     .catch(err => {
//       console.error('Error deleting post:', err);
//       res.status(500).json({ error: 'Failed to delete post. Please try again.' });
//     });
// });

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   // Serve index.html for all remaining routes
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// //
// //correct

// server.js// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const pagesRoutes = require('./routes/pagesRoutes'); // Import pagesRoutes
const quicklinkRoutes = require('./routes/quicklinksRoutes');

app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/pages', pagesRoutes); // Use pagesRoutes
app.use('/api/quicklinks', quicklinkRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve index.html for all remaining routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
