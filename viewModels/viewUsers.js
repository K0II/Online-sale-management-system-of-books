var users = require('../models/users');

function getUsersEle(users){
    return {
        users: users.map(function(user){
            return {
                id: user._id,
                name: user.name,
                password: user.password,
                address: user.address,
                telephone: user.telephone,
            };
        }),
    };
}
module.exports = getUsersEle;
