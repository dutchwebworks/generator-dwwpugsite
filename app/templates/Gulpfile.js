/*
	Dutchwebworks Gulp boilerplate, dec. 2016
*/

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')(),
	pug = require('gulp-pug'),
	gulp_watch_pug = require('gulp-watch-pug'),
	clean = require('gulp-contrib-clean'),
	copy = require('gulp-contrib-copy'),
	pkg = require('./package.json'),
	reload = browserSync.reload,
	src = './src'
	dist = './dist',
	config = {
		htmlPath: dist,
		scssPath: src + '/scss',
		cssPath: dist + '/css',
		jsPathSrc: src + '/js',
		jsPathDest: dist + '/js',
		imgPathSrc: src + '/img',
		imgPathDest: dist + '/img'
	},
	meta = {
		banner: ['/*!',
			' * Name: <%= pkg.name %>',
			' * Author: <%= pkg.author %>',
			' * Version: <%= pkg.version %>',
			' * Date: ' + formatDate(),
			' */',
			'',
		''].join('\n')
	};

/**********************************************************************
2. Custom functions
**********************************************************************/

// Generate pretty date for banner header in minified files
function formatDate() {
	var today = new Date(),
		month = today.getMonth() + 1,
		day = today.getDate();

	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	return (today.getFullYear() + '-' + month) + '-' + day;
}

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* Sass compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('sass', function(){
	return gulp.src(config.scssPath + '/**/*.scss')
		.pipe($.newer(config.cssPath + '/css'))
		.pipe($.sass({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
		.pipe(gulp.dest(config.cssPath))
		.pipe(browserSync.stream());
});

/* Compile Pug templates
-------------------------------------------------------------------- */

gulp.task('pug', function buildHTML() {
	return gulp.src(src + '/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(dist));
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: dist
		}
	});
});

/* Cleanup the Sass generated --sourcemap *.map.css files
-------------------------------------------------------------------- */

gulp.task('clean', function(){
	gulp.src([dist], {read: false}).pipe(clean());
});

/* Copy
-------------------------------------------------------------------- */

gulp.task('copy', function(){
	gulp.src([
		config.jsPathSrc + '**/*.js',
		config.imgPathSrc + '**/.{gif|jpg|png}'
	])
	.pipe(copy())
	.pipe(gulp.dest(dist));
});

/**********************************************************************
4. Registered Gulp tasks
**********************************************************************/

gulp.task('build', ['clean'], function(){
	gulp.start('pug');
	gulp.start('sass');
	gulp.start('copy');
});

gulp.task('serve', ['browser-sync'], function(){
	gulp.watch(dist + '/*.html').on('change', browserSync.reload);
	gulp.watch(config.cssPath + '/*.css').on('change', browserSync.reload);
	gulp.watch(src + '/*.pug', ['pug']).on('change', browserSync.reload);
	gulp.watch(config.scssPath + '/**/*.scss', ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['build']);