const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  country: String,
});

const User = mongoose.model('users', userSchema);

module.exports = {
  Box,
  User,
};
