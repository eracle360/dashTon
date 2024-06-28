const mongoose = require('mongoose');

const JettonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  marketCap: { type: String, required: true },
  price: { type: String, required: true },
  change1h: { type: String, required: true },
});

module.exports = mongoose.model('Jetton', JettonSchema);
