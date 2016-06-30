var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema ({
    title: String,     // 书名
    author: String,    // 作者
    publish: String,   // 出版社
    description: String,    // 简介
    category: String,    // 分类
    price: Number,     // 价格
    stock: Number,     // 库存
    img: String,       // 图片路径
    time: { type:Date, default: Date.now },    // 发布时间
});

var Book = mongoose.model('Book',bookSchema);

module.exports = Book;
