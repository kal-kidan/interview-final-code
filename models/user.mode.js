const mongoose = require('./db_connection.js');
const UserSchema = new mongoose.schema({ login: String, password: String, role: String, name: String, score: Number, data: mongoose.Schema.Types.Mixed });
const User = mongoose.model('User', UserSchema);
module.exports = User;