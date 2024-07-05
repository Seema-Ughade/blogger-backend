// routes/quicklinksRoutes.js

const express = require('express');
const router = express.Router();
const quicklinksController = require('../controllers/quicklinkController');

// Routes for Quick Links
router.get('/', quicklinksController.getQuickLinks);
router.post('/', quicklinksController.createQuickLink);
router.put('/:id', quicklinksController.updateQuickLink);
router.delete('/:id', quicklinksController.deleteQuickLink);

module.exports = router;
