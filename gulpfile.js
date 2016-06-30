var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');  //  
var clean = require('gulp-clean');
var handlebars = require('gulp-compile-handlebars');  //

gulp.task('css', function(){
    gulp.src('./public/styles/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function(){
    gulp.src('./public/scripts/**/*.js')
        .pipe(concat('main.js'))              //  合并在一个文件里
        .pipe(gulp.dest('./build/js'))
        .pipe(uglify())                      //  不管多少级都被压缩了，并且是单个文件分别压缩的(如果没有上一个合并)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js'));      //  最终发布时更换一下路径
});

gulp.task('img', function(){
    gulp.src('./public/images/**/*.*')
        .pipe(gulp.dest('./build/img'));
});

gulp.task('clean',['browser-sync'], function(){
    return gulp.src(['./build/css','./build/js','./build/img'],{read: false})
               .pipe(clean());
});

gulp.task('default',['clean'],function(){
    gulp.start(['css','js','img']);
});

// gulp.task('default', function () {
// 	options = {
// 		ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
// 		// partials : {
// 		// 	footer : '<footer>the end</footer>'
// 		// },
// 		// batch : ['./src/partials'],
//         helpers: {
//             section: function(name,options){
//                 if(!this._sections) this._sections = {};
//                 this._sections[name] = options.fn(this);
//                 return null;
//             }
//         }
// 	}
//
//     return gulp.src('views/**/*.hbs')
//     .pipe(handlebars(templateData, options))
//     .pipe(rename({extname:'.html'}))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('browser-sync', function () {
   var files = [
      'build/css/*.css',
      'build/js/*.js',
      'build/img/*',
      'build/*.html'
   ];
   browserSync.init(files, {
      port: 8080,
      server: {
         baseDir: './build'
      }
   });
});
