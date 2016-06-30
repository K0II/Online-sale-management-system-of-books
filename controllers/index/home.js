var books = require('../../models/books');
var users = require('../../models/users');
var viewBooks = require('../../viewModels/viewBooks');

module.exports = {
    home: function(req,res){
        books.find({},function(err,books){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('index/home',{data:viewBooks(books)});
            }
        })
    },
    books_run: function(req,res){
        books.find({ category: req.params.category },function(err,books){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('index/home',{data:viewBooks(books)});
            }
        })
    },
    logout: function(req,res) {
        req.session.userId = null;
        return res.redirect(303,'/');
    }
}
