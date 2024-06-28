const User = require('../models/userModel');

exports.login = (req, res) => {
  const { telegramId, username } = req.body;
  
  User.findOne({ telegramId }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (user) {
      // User exists, log them in
      req.session.user = user;
      res.redirect('/');
    } else {
      // User does not exist, create new user
      const newUser = new User({ telegramId, username });

      newUser.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        req.session.user = newUser;
        res.redirect('/');
      });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    res.redirect('/');
  });
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.redirect('/login');
};
