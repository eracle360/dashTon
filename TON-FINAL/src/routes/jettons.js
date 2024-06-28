const express = require('express');
const router = express.Router();
const jettonController = require('../controllers/jettonController');

router.get('/', jettonController.getJettons);
router.post('/add', jettonController.addJetton);

module.exports = router;
