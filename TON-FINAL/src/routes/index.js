const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.getHomepage);
router.get('/app/:id', appController.getAppDetails);

module.exports = router;
