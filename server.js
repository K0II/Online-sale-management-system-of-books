var express = require('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var formidable = require('formidable');
var morgan = require('morgan');
var logger = require('express-logger');
var marked = require('marked');

// const crypto = require('crypto');
//
// const hash = crypto.createHash('md5');
//
// // 可任意多次调用update():
// hash.update('Hello, world!');//6cd3556deb0da54bca060b4c39479839
// hash.update('Hello, nodejs!');
//
// console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544


// 证书，已添加到 .gitignore  -----------------  //
var credentials = require('./credentials');

var app = express();

// 一些中间件  -----------------  //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(credentials.cookieSecret));
app.use(session({
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
}));

// Handlebars模版引擎  -----------------  //
app.set('view cache', true);
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'index',
    extname: ".hbs",
    helpers: {
        section: function(name,options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs',handlebars.engine);
app.set('view engine','hbs');

// 静态资源目录  -----------------  //
app.use(express.static(__dirname + '/public'));

// 设置端口 可以用 PORT=3000 node server.js 覆盖  -----------------  //
app.set('port', process.env.PORT || 8080);

// 开发日志和生产日志  -----------------  //
switch( app.get('env') ){
    case 'development' : app.use(morgan('dev')); break;
    case 'production' : app.use(logger({ path: __dirname + '/log/requests.log' })); break;
    // 在生产模式下运行程序  NODE_ENV=production node server
}

// 连接数据库  -----------------  //
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(){
    console.error('MongoDB connection failed');
});
db.once('open', function(){
  console.log('MongoDB connected!')
});

// 即显消息  -----------------  //
app.use(function(req,res,next){
    res.locals.userId = req.session.userId;
    console.log(res.locals.userId);
    //res.locals.flash = req.session.flash;  //  如果有即显消息，传到上下文中
    //delete req.session.flash;  //  显示后，从session中清除，以免下一次请求时再显示
    next();
})

// 所有路由  -----------------  //
require('./routes.js')(app);

// 错误处理  -----------------  //
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(404);
    res.render('404');
});
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// 监听  -----------------  //
app.listen( app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') );
});
