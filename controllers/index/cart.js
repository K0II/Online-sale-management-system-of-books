'use strict';
var books = require('../../models/books');
var orders = require('../../models/orders');
var viewBooks = require('../../viewModels/viewBooks');
var viewOrders = require('../../viewModels/viewOrders');

module.exports = {
    cart: function(req,res){
        orders.find({user_id:req.session.userId,unCommit:true},function(err,orders){
            if(err){
                return redirect(303,'/');
            }
            // 购物车里只有一个订单
            console.log(viewOrders(orders).orders[0]);
            res.render('index/cart',{data:viewOrders(orders).orders[0]});
        });
    },
    cart_prmt: function(req,res){
        if (req.session.userId) {    //  已登录用户
                books.findOne({_id:Object(req.params.id)},function(err,book){
                    orders.findOne({user_id:req.session.userId,unCommit:true},function(err,doc){
                        if(!doc) {    // orders 里没有这个用户
                            console.log('ss');
                            var order_books = [];
                            order_books[0] = {book_id: req.params.id,
                                          book_total: book.price,
                                          book_amount: 1};
                            orders.create({
                                user_id: Object(req.session.userId),
                                order_books: order_books[0],
                            },function(err){
                                return res.redirect(303,'/index/cart');
                            });
                        } else {    // 有这个用户  一个用户了可以对应多个订单
                            if(!doc.order_books){
                                orders.update(
                                    {user_id: Object(req.session.userId)},
                                    {$push:{order_books:{book_id: req.params.id,
                                                  book_total: book.price,
                                                  book_amount: 1}}},
                                    {upsert:true},
                                function(err){
                                    return res.redirect(303,'/index/cart');
                                });
                            }else{
                                console.log('else');
                                var len = doc.order_books.length;
                                for(let i=0;i<len;i++) {
                                    if(doc.order_books[i].book_id == req.params.id){  //  已经加入过购物车
                                        doc.order_books[i].book_amount++;
                                        doc.order_books[i].book_total += book.price;
                                        doc.save();
                                        return res.redirect(303,'/index/cart');
                                    }
                                }
                                var newbook = {
                                    book_id: req.params.id,
                                    book_amount: 1,
                                    book_total: book.price
                                };
                                doc.order_books.push(newbook);
                                doc.save();
                                return res.redirect(303,'/index/cart');
                            };

                        }
                    });
                });
        } else {    //  未登录用户
            return res.redirect(303,'/index/login');
        }
    },
    cart_del: function(req,res){

    }
}
