var books = require('../models/books');

function getBooksEle(books){
    return {
        books: books.map(function(book){
            return {
                id: book._id,
                title: book.title,
                author: book.author,
                publish: book.publish,
                description: book.description.replace(/(<br>)/g,'\n\r'),
                category: book.category,
                price: book.price,
                stock: book.stock,
                img: book.img,
                time: book.time.toLocaleString().substr(0,10)
            };
        }),
    };
}
module.exports = getBooksEle;
