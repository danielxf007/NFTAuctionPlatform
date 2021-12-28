const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    user_name: String,
    password: String
});

const user_model = mongoose.model('user', user_schema);

module.exports = user_model;