var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user_id: Object,      // 根据用户 id可以找到用户名、收货地址、用户电话
    order_books: [{book_id: Object,
                   book_amount: {type:Number, default:0},
                   book_total: Number,
    }],                  // 购买的图书数组
    total_sum: Number,
    commit_time: { type:Date, default:Date.now },    //  提交时间
    unCommit: {type:Boolean, default:true},     //  用户是否提交
    unDeal: {type:Boolean, default:true},       //  管理员是否处理
    unReceive: {type:Boolean, default:true},    //  用户是否确定收货
});

var Order = mongoose.model('Order',orderSchema);

module.exports = Order;
