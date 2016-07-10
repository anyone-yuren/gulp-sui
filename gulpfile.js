var gulp = require('gulp');
var tmod = require('gulp-tmod');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jquery = require('jquery');
gulp.task('tmod-tpl',function() {
	var stream = gulp.src('./www/tpls/*.html')
				.pipe(tmod({
					type:'default',
					templateBase:'./www/tpls'
				}))
//				.pipe(uglify())
				.pipe(gulp.dest('./www/build'));
	return stream;
})

gulp.task('index',['tmod-tpl'],function() {
	return gulp.src('./www/js/index.js')
			.pipe(browserify())
			.pipe(uglify())
			.pipe(concat('all.min.js'))
			.pipe(gulp.dest('./www/build'));
})

//gulp.task('ug-all',function() {
//	console.log('start concat all');
//	return gulp.src(['./libs/jquery.min.js','./libs/libs/light7.min.js','./www/build/all.min.js'])
//			.pipe(browserify())
//			.pipe(concat('main.min.js'))
//			.pipe(gulp.dest('./www/build'))
//})

gulp.task('default',['index'],function() {
	console.log('finish........');
});

gulp.watch(['./www/js/**/*.js','./www/tpls/*.html'],['index']);
