const mongoose = require('mongoose');

// Could be a good idea to change the user that performs the updates and querys to the database

const boxSchema = new mongoose.Schema({
  name: String,
  full: Boolean,
  updated: {
    type: String,
    default: new Date().toISOString(),
  },
  timesUpdated: {
    type: Number,
    default: 0,
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
  comments: String,
  simType: String,
});

const Box = mongoose.model('boxes', boxSchema);

module.exports = Box;
