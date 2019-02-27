// Retrieve
const mongoose = require('mongoose');

const db = mongoose.connection;
const url = 'mongodb://localhost:27017/tempus';

mongoose.connect(url, { useNewUrlParser: true });

// Connect to the db
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  console.log('connnnnnnected!') // eslint-disable-line
});

module.exports = db;
