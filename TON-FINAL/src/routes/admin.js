const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login page
router.get('/login', (req, res) => {
    res.render('adminLogin');
});

// Admin login handling
router.post('/login', adminController.login);

// Admin dashboard
router.get('/dashboard', adminController.ensureAdmin, adminController.dashboard);

// Add new app form
router.get('/add-app', adminController.ensureAdmin, adminController.renderAddAppForm);

// Handle add new app form submission
router.post('/add-app', adminController.ensureAdmin, adminController.addApp);

// Approve app
router.post('/approve/:id', adminController.ensureAdmin, adminController.approveApp);

// Delete app
router.post('/delete/:id', adminController.ensureAdmin, adminController.deleteApp);

// Logout
router.get('/logout', adminController.logout);

module.exports = router;
