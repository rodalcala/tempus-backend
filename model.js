const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  full: Boolean,
  updated: {
    type: Number,
    default: new Date().toISOString(),
  },
  dataLeft: {
    type: Number,
    default: 0,
  },
  minsLeft: {
    type: Number,
    default: 0,
  },
  expiration: String,
  lat: Number,
  lng: Number,
});

const Box = mongoose.model('box', boxSchema);

module.exports = Box;
