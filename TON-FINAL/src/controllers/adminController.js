const App = require('../models/appModel');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, isAdmin: true }).exec();
    if (!user || password !== 'adminpassword') { // Simplified password check
      req.flash('error_msg', 'Invalid credentials');
      return res.redirect('/admin/login');
    }
    req.session.user = user;
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Server error');
    res.redirect('/admin/login');
  }
};

exports.ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    return next();
  }
  res.redirect('/admin/login');
};

exports.dashboard = async (req, res) => {
  try {
    const pendingApps = await App.find({ status: 'pending' }).exec();
    const approvedApps = await App.find({ status: 'approved' }).exec();
    res.render('adminDashboard', { user: req.session.user, pendingApps, approvedApps });
  } catch (err) {
    console.error(err);
    res.render('adminDashboard', { user: req.session.user, pendingApps: [], approvedApps: [] });
  }
};

exports.renderAddAppForm = (req, res) => {
  res.render('adminAddApp', { user: req.session.user });
};

exports.addApp = [
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 },
    { name: 'video', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const newApp = new App({
        appName: req.body.appName,
        caption: req.body.caption,
        category: req.body.category,
        languages: req.body.languages,
        description: req.body.description,
        appStore: req.body.appStore,
        googlePlay: req.body.googlePlay,
        github: req.body.github,
        website: req.body.website,
        telegram: req.body.telegram,
        socialMedia: req.body.socialMedia,
        icon: req.files.icon ? `/uploads/${req.files.icon[0].filename}` : '',
        screenshots: req.files.screenshots ? req.files.screenshots.map(file => `/uploads/${file.filename}`) : [],
        video: req.files.video ? `/uploads/${req.files.video[0].filename}` : '',
        status: 'pending' // Set status to pending initially
      });
      await newApp.save();
      res.redirect('/admin/dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/admin/add-app');
    }
  }
];

exports.approveApp = async (req, res) => {
  try {
    await App.findByIdAndUpdate(req.params.id, { status: 'approved' }).exec();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
};

exports.deleteApp = async (req, res) => {
    try {
      await App.findByIdAndDelete(req.params.id).exec();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ success: false });
    }
  };

  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/admin/dashboard');
      }
      res.clearCookie('connect.sid');
      res.redirect('/admin/login');
    });
  };
