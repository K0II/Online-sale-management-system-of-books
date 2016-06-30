var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
    name: String,
    password: String,
    address: String,
    telephone: String,
});

var User = mongoose.model('User',userSchema);

module.exports = User;
