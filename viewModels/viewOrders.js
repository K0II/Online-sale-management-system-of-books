'use strict';

var orders = require('../models/orders');
var books = require('../models/books');
var viewBooks = require('./viewBooks');

function getOrdersEle(orders){
    var book_infos=[];
    return {
        orders: orders.map(function(order){
            var len = order.order_books.length;
            var temp = order.order_books;
            for (let i=0; i<len;i++) {
                books.findOne({_id:Object(order.order_books[i].book_id)},function(err,doc){
                    //console.log(doc);
                    temp[i].book_title = doc.title;
                })
            }
            return {
                order_id: order._id,
                user_id: order.user_id,
                order_books: temp,
                total_sum: order.total_sum,
                unCommit: order.unCommit,    //  用户是否提交
                unDeal: order.unDeal,    //  管理员是否处理
                unReceive: order.unReceive,
                commit_time: order.commit_time.toLocaleString().substr(0,10)
            };
        }),
    }
}
module.exports = getOrdersEle;
