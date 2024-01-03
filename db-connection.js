// Connect to MongoDB
const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection;
