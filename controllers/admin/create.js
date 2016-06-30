var books = require('../../models/books');

module.exports = {
    create: function(req,res){
        res.render('admin/create',{layout:'admin'});
    },
    create_post: function(req,res){
        books.create({
            title : req.body.title,
            author: req.body.author,
            publish: req.body.publish,
            description : req.body.description.replace(/\n/g,'<br>'),
            category : req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img,
        },function(err,doc){
            if(err) {
                console.error(err);
            } else {
                return res.redirect(303,'/admin');
            }
        });
    },
}
