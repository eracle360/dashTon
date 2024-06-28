const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  caption: { type: String },
  category: { type: String },
  languages: { type: String },
  description: { type: String },
  appStore: { type: String },
  googlePlay: { type: String },
  github: { type: String },
  website: { type: String },
  telegram: { type: String },
  socialMedia: { type: String },
  icon: { type: String },
  screenshots: { type: [String] },
  video: { type: String },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('App', AppSchema);
