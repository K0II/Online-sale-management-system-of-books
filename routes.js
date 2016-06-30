var index = require('./controllers/index/home');
var index_cart = require('./controllers/index/cart');
var index_enroll = require('./controllers/index/enroll');
var index_login = require('./controllers/index/login');
var index_orders = require('./controllers/index/orders');
var admin = require('./controllers/admin/home');
var admin_create = require('./controllers/admin/create');
var admin_update = require('./controllers/admin/update');

module.exports = function(app){
    app.get('/', index.home);

    app.get('/index/enroll', index_enroll.enroll);
    app.post('/index/enroll_post', index_enroll.enroll_post);
    app.get('/index/login', index_login.login);
    app.post('/index/login_post', index_login.login_post);

    app.get('/index/cart/:id', index_cart.cart_prmt);
    app.get('/index/cart/deletion/:book_id', index_cart.cart_del);
    app.get('/index/cart', index_cart.cart);

    app.get('/index/orders', index_orders.orders);
    app.post('/index/order_post', index_orders.order_post);

    app.get('/index/logout', index.logout);

    app.get('/books/:category',index.books_run);

    app.get('/admin', admin.home);
    app.post('/admin',admin.retrieve_post);
    app.get('/admin/deletion/:id',admin.delete_run);

    app.get('/admin/create',admin_create.create);
    app.post('/admin/create',admin_create.create_post);
}
