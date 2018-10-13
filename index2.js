const mongoose = require('mongoose');
const env = require('dotenv').load();
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const conn = mongoose.createConnection(process.env.URL, { useNewUrlParser: true });

const userSchema = new Schema({
  login: String,
  password: String  
});

const User = conn.model('User', userSchema);

module.exports = User;


