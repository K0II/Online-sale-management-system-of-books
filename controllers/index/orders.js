var books = require('../../models/books');
var users = require('../../models/users');
var orders = require('../../models/orders');
var viewBooks = require('../../viewModels/viewBooks');
var viewOrders = require('../../viewModels/viewOrders');

module.exports = {
    orders: function(req,res){
        orders.find({user_id:req.session.userId},function(err,orders){
            if(err){
                return redirect(303,'/');
            }
            // 购物车里只有一个订单
            res.render('index/orders',{data:viewOrders(orders)});
        });
    },
    order_post: function(req,res){
        orders.update({_id:req.body.order_id,unCommit:false},function(err){
            return res.redirect(303,'/index/orders');
        })
    }
}
