var users = require('../../models/users');
var books = require('../../models/books');
module.exports = {
    login: function(req,res){
        res.render('index/login',{layout:null});
    },
    login_post: function(req,res){
        users.findOne({name:req.body.name,password:req.body.password},function(err,doc){
            if(doc) {    //  找到了用户名
                req.session.userId = doc._id;
                console.log(doc._id);
                console.log(req.session.userId);
                return res.redirect(303,'/');
            } else {    //  没有找到用户名
                res.json({
                    error: 1,
                    success: 0,
                    message: '用户名或密码不正确',
                });
            }
        });
    },
}
