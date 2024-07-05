// controllers/quickLinksController.js

const QuickLink = require('../models/QuickLink');

// Create a new Quick Link
exports.createQuickLink = async (req, res) => {
  try {
    const newQuickLink = new QuickLink(req.body);
    const savedQuickLink = await newQuickLink.save();
    res.status(201).json(savedQuickLink);
  } catch (error) {
    console.error('Error saving quick link:', error);
    res.status(500).json({ error: 'Failed to save quick link' });
  }
};

// Get all Quick Links
exports.getQuickLinks = async (req, res) => {
  try {
    const quickLinks = await QuickLink.find();
    res.json(quickLinks);
  } catch (error) {
    console.error('Error fetching quick links:', error);
    res.status(500).json({ error: 'Failed to fetch quick links' });
  }
};

// Delete a Quick Link
exports.deleteQuickLink = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuickLink = await QuickLink.findByIdAndDelete(id);
    if (!deletedQuickLink) {
      return res.status(404).json({ error: 'Quick link not found' });
    }
    res.status(200).json({ message: 'Quick link deleted successfully' });
  } catch (error) {
    console.error('Error deleting quick link:', error);
    res.status(500).json({ error: 'Failed to delete quick link' });
  }
};

// Update a Quick Link
exports.updateQuickLink = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuickLink = await QuickLink.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuickLink) {
      return res.status(404).json({ error: 'Quick link not found' });
    }
    res.status(200).json(updatedQuickLink);
  } catch (error) {
    console.error('Error updating quick link:', error);
    res.status(500).json({ error: 'Failed to update quick link' });
  }
};
