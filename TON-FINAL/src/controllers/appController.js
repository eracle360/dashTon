const App = require('../models/appModel');

exports.getHomepage = async (req, res) => {
  try {
    const promotedApps = await App.find({ status: 'approved' }).exec();
    res.render('index', { user: req.session.user, promotedApps, jettons: [] });
  } catch (err) {
    console.error(err);
    res.render('index', { user: req.session.user, promotedApps: [], jettons: [] });
  }
};

exports.getAppDetails = async (req, res) => {
  try {
    const app = await App.findById(req.params.id).exec();
    res.render('appDetails', { user: req.session.user, app });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.addApp = async (req, res) => {
  try {
    const newApp = new App(req.body);
    await newApp.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
