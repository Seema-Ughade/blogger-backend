const Page = require('../models/Page');

// Controller to handle adding or updating a page
exports.savePage = async (req, res) => {
  const { title, content, metaKeywords, metaDescription, status, cloneForOtherLanguage } = req.body;

  try {
    if (req.params.id) {
      // Update existing page
      const updatedPage = await Page.findByIdAndUpdate(req.params.id, {
        title,
        content,
        metaKeywords,
        metaDescription,
        status,
        cloneForOtherLanguage
      }, { new: true });

      res.status(200).json(updatedPage);
    } else {
      // Create new page
      const newPage = new Page({
        title,
        content,
        metaKeywords,
        metaDescription,
        status,
        cloneForOtherLanguage
      });

      const savedPage = await newPage.save();
      res.status(201).json(savedPage);
    }
  } catch (error) {
    console.error('Error saving or updating page:', error);
    res.status(500).json({ error: 'Failed to save or update page. Please try again.' });
  }
};

// Controller to handle deleting a page
exports.deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    if (!deletedPage) {
      return res.status(404).json({ error: 'Page not found.' });
    }
    res.status(200).json({ message: 'Page deleted successfully.' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page. Please try again.' });
  }
};

// Controller to handle fetching all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages. Please try again.' });
  }
};
