const Jetton = require('../models/jettonModel');

exports.getJettons = async (req, res) => {
  try {
    const jettons = await Jetton.find();
    res.render('index', { jettons });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.addJetton = async (req, res) => {
  try {
    const newJetton = new Jetton(req.body);
    await newJetton.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};
