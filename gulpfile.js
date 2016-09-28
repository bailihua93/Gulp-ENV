var gulp =  require('gulp'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    streamify = require('streamify'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    buffer = require('gulp-buffer'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

// 定义路径
var path = {
	HTML: 'front/*.html',
	SASS: 'front/css/*.scss',
	JSX: ['front/jsx/main.js', 'front/jsx/box.js'],
	JS: 'front/js/*.js',
	ES: ['front/es/one.js', 'front/es/two.js'],
	LIB: 'front/lib/*.js',
	IMAGE: 'front/image/*',
	DEST_HTML: 'build',
	DEST_CSS: 'build/css',
	DEST_JS: 'build/js',
	DEST_IMAGE: 'build/image',
	CLEAN: 'build/*'
};
var filename = {
	CSS: 'style.css',
	REACT: 'bundle.js',
	JS: 'main.min.js',
	ES: 'module.js'
};

// 压缩html
gulp.task('htmlmin', function(){
	var options = {
		removeComments: true,
		collapseWhitespace: true,
		minifyCSS: true,
		minifyJS: true
	};
	gulp.src(path.HTML)
		.pipe(htmlmin(options))
		.pipe(gulp.dest(path.DEST_HTML))
});

// 编译SASS并压缩
gulp.task('sass', function(){
	gulp.src(path.SASS)
		.pipe(sass())
		.pipe(concat(filename.CSS))
		.pipe(minifyCss())
		.pipe(autoprefixer())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.DEST_CSS))
});

// 编译React
/*
// 第一种解决方案，第二种方案更好，所以注释
gulp.task('react', function(){
	browserify(path.JSX)
		.transform(babelify, {
		presets: ['es2015', 'react']
	})
	.bundle()
	.pipe(source(filename.REACT))
	.pipe(jshint())
	.pipe(gulp.dest(path.DEST_JS))
});
*/

gulp.task('react', function(){
	return browserify(path.JSX)
		.transform(babelify)
		.bundle()
		.pipe(source(filename.REACT))
		.pipe(jshint())
		.pipe(gulp.dest(path.DEST_JS))
});

// 编译ES2015
gulp.task('es2015', function(){
	return browserify(path.ES)
		.transform(babelify)
		.bundle()
		.pipe(source(filename.ES))
		.pipe(jshint())
		.pipe(buffer())
		// .pipe(uglify())
		.pipe(gulp.dest(path.DEST_JS))
});

// 编译JS并压缩
gulp.task('js', function(){
	return gulp.src(path.JS)
		.pipe(concat(filename.JS))
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest(path.DEST_JS))
});

// 压缩第三方库
gulp.task('lib', function(){
	return gulp.src(path.LIB)
		.pipe(uglify())
		.pipe(gulp.dest(path.DEST_JS))
});

// 压缩图片
gulp.task('imagemin', function(){
	return gulp.src(path.IMAGE)
		.pipe(imagemin())
		.pipe(gulp.dest(path.DEST_IMAGE));
});

// 清空build目录
gulp.task('clean', function(){
	return gulp.src(path.CLEAN)
		.pipe(clean({force: true}));
});

// 监控文件变化，自动编译
gulp.task('watch', function(){
	gulp.watch(path.HTML, ['htmlmin']);
	gulp.watch(path.SASS, ['sass']);
	gulp.watch(path.JSX, ['react']);
	gulp.watch(path.ES, ['es2015']);
	gulp.watch(path.JS, ['js']);
	gulp.watch(path.LIB, ['lib']);
	gulp.watch(path.IMAGE, ['imagemin']);
	livereload.listen();
	gulp.watch([path.CLEAN]).on('change', livereload.changed);
});

// 默认执行的任务
gulp.task('default', ['watch'], function(){
	gulp.start('htmlmin', 'sass', 'react', 'es2015', 'js', 'lib', 'imagemin');
});

// gulp.task('default', function(){
// 	gulp.start('htmlmin', 'react', 'sass', 'es2015', 'js', 'lib', 'imagemin');
// });
