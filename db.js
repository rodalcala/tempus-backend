// Retrieve
const mongoose = require('mongoose');

const db = mongoose.connection;
const url = `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.connect(url, { useNewUrlParser: true });

// Connect to the db
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  console.log(`Connected to the database on port ${process.env.MONGO_PORT}.`) // eslint-disable-line
});

module.exports = db;
