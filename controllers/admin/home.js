var books = require('../../models/books');
var viewBooks = require('../../viewModels/viewBooks');

module.exports = {
    home: function(req,res){
        books.find({},function(err,books){
            if(err){
                console.error(err.stack);
            }
            res.render('admin/home',{layout:'admin',data:viewBooks(books)});
        });
    },
    retrieve_post: function(req,res){
        var reg_title =  eval("/.*" + req.body.title + ".*/");
        var reg_author = eval("/.*" + req.body.author + ".*/");
        var reg_category = eval("/.*" + req.body.category + ".*/");
        books.find({
            title: reg_title,
            author: reg_author,
            category: reg_category,
        },function(err,books){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('admin/home',{layout:'admin',data:viewBooks(books)});
            }
        })
    },
    delete_run: function(req,res){
        books.remove({_id: req.params.id},function(err,docs){
            if(err) {
                console.error(err.stack);
            }
            else{
                books.find({},function(err,books){
                    if(err){
                        console.error(err.stack);
                    }
                    res.render('admin/home',{layout:'admin',data:viewBooks(books)});
                });
            }
        });
    }
}
