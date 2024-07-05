const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

// Routes for pages
router.get('/', pagesController.getAllPages);
router.post('/', pagesController.savePage);
router.put('/:id', pagesController.savePage);
router.delete('/:id', pagesController.deletePage);

module.exports = router;
