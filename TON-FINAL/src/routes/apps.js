const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

// Define routes
router.get('/', appController.getHomepage);
router.get('/:id', appController.getAppDetails);
router.post('/add', appController.addApp);

module.exports = router;
