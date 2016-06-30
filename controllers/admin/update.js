var books = require('../../models/books');

module.exports = {
    update: function(req,res){
        res.render('admin/update',{layout:'admin'});
    },
}
