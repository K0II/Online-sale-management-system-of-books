var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    address: String,
    telephone: String,
});

var Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;
