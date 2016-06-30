var users = require('../../models/users');

module.exports = {
    enroll: function(req,res){
        res.render('index/enroll',{layout:null});
    },
    enroll_post: function(req,res){
        users.find({name: req.body.name} ,function(err,doc){
            if(doc[0]) {    // 有重名
                res.json({ message: '用户名已被注册' });
            } else {       // 没有重名
                users.create({
                    name: req.body.name,
                    password: req.body.password,
                    telephone: req.body.telephone,
                    address: req.body.address
                },function(err,doc){
                    if(err) {
                        console.error(err);
                    } else {
                        return res.redirect(303,'/index/login');
                    }
                });
            }
        });
    },
}
