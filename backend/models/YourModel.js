const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  name: String,
  details: String,
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
