//在你的项目根目录下创建gulpfile.js，代码如下：
 
// 引入 gulp
var gulp = require('gulp');
 
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    less = require('gulp-less'),
    connect = require('gulp-connect');
 
// // 压缩html
// gulp.task('html', function() {
//   return gulp.src('src/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('./dest'))
//     .pipe(notify({ message: 'html task ok' }));
 
// });

gulp.task('connect', function () {
	connect.server({
		root: './',
		port: 8080,
		livereload: true,
		reload: true
	});
});
 
// 压缩图片
gulp.task('img', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./src/build/img/'))
    .pipe(notify({ message: 'img task ok' }))
    .pipe(connect.reload());
});
 
// 合并、压缩、重命名css
// gulp.task('css', function() {
//   return gulp.src('src/css/*.css')
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('dest/css'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dest/css'))
//     .pipe(notify({ message: 'css task ok' }));
// });
 
gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('src/build/css'))
        .pipe(connect.reload());
});

// 检查js
gulp.task('lint', function() {
  return gulp.src('src/js/**')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});


gulp.task('reload', function() {
  gulp.src('src/less/main.less')
        .pipe(connect.reload());
});
 
// 合并、压缩js文件
gulp.task('js', function() {
  return gulp.src([
        'src/js/init.js',
  			'src/js/utils/*.js',
  			'src/js/views/*.js',
  			'src/js/app.js'
  	])
    .pipe(concat('common.js'))
    .pipe(gulp.dest('src/build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('src/build/js'))
    .pipe(notify({ message: 'js task ok' }))
    .pipe(connect.reload());
});
 
// 默认任务
gulp.task('default', function(){
  gulp.run('img', 'less', 'lint', 'js', 'connect');
 
  // 监听html文件变化
  gulp.watch('**/*.html', ['reload']);
 
  gulp.watch('./*.html', ['reload']);

  // Watch .css files
  gulp.watch('src/less/**', ['less']);
 
  // Watch .js files
  gulp.watch('src/**/*.js', ['lint', 'js']);
 
  // Watch image files
  gulp.watch('src/img/*', ['img']);

});