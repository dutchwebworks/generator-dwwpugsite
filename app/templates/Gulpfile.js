/*
	Dutchwebworks Gulp boilerplate, dec. 2016
*/

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	$ = require('gulp-load-plugins')(),
	reload = browserSync.reload,
	src = './src'
	dist = './dist'
	config = {
		htmlPath: dist,
		scssPath: src + '/scss',
		cssPath: dist + '/css',
		jsPathSrc: src + '/js',
		jsPathDest: dist + '/js',
		imgPathSrc: src + '/img',
		imgPathDest: dist + '/img'
	};

/**********************************************************************
2. Banner info prefixed to minified files (see `package.json`)
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

// Meta-data and other vars
var pkg = require('./package.json'),
	dist = './httpdocs',
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
3. Configure Gulp tasks
**********************************************************************/

/* Sass compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('sass:dev', function(){
	return gulp.src(dist + '/sass/**/*.scss')
		.pipe($.newer(dist + '/css'))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			style: 'extended',
			sourceComments: 'map',
			sourcemap: true,
			errLogToConsole: true
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(dist + '/css'));
});

gulp.task('sass:dist', function(){
	return gulp.src(dist + '/sass/**/*.scss')
		.pipe($.newer(dist + '/css'))
		.pipe($.sass({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
		.pipe(gulp.dest(dist + '/css'));
});

/* Concatenate and minify Css files
-------------------------------------------------------------------- */

gulp.task('cssmin', function(){
	return gulp.src([
			dist + '/css/style.css'
		])
		.pipe($.concat('style.min.css'))
		.pipe($.minifyCss({
			keepBreaks: false,
			removeEmpty: true
		}))
		.pipe($.header(meta.banner, {
			pkg : pkg,
		 } ))
		.pipe(gulp.dest(dist + '/css'));
});

/* Optimize JPG, PNG and GIF's
-------------------------------------------------------------------- */

gulp.task('imagemin', function(){
	return gulp.src(dist + '/img/**/*.{png,jpg,gif}')
		.pipe($.imagemin({
			optimazationLevel: 5,
			progressive: false,
			interlaced: true
		}))
		.pipe(gulp.dest(dist + '/img'));
});

/* Optimize SVG's
-------------------------------------------------------------------- */

gulp.task('svgmin', function(){
	return gulp.src(dist + '/img/**/*.svg')
		.pipe($.svgmin())
		.pipe(gulp.dest(dist + '/img'));
});

/* Jshint lint Javascript files
-------------------------------------------------------------------- */

gulp.task('jshint', function(){
	return gulp.src(dist + '/js/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
});

/* Concatenate and uglify Javascript files
-------------------------------------------------------------------- */

gulp.task('uglify', function(){
	return gulp.src([
			dist + '/js/libs/jquery-2.1.0.js',
			dist + '/js/libs/modernizr-2.7.1.js',
			dist + '/js/common.js'
		])
		.pipe($.concat('common.js', {
			newLine: ';'
		}))
		.pipe($.uglify())
		.pipe($.header(meta.banner, {
			pkg : pkg,
		 } ))
		.pipe(gulp.dest(dist + '/js/min'));
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function() {
	browserSync({
		// proxy: { 'gulp-test.local.cassius.nl' }
		server: {
			baseDir: dist
		}
	});
});

/* Cleanup the Sass generated --sourcemap *.map.css files
-------------------------------------------------------------------- */

gulp.task('clean', function(){
	gulp.src([
		dist + '/css/**/*.map',
		dist + '/js/**/*.map',
		],{read: false})
		.pipe($.clean());
});

/**********************************************************************
4. Registered Gulp tasks
**********************************************************************/

// Server (proxy) and file `watcher` livereload for local development
gulp.task('serve', ['browser-sync'], function(){
	gulp.watch(dist + '/*.html', [reload]);
	gulp.watch(dist + '/css/*.css', [reload]);
	gulp.watch(dist + '/sass/**/*.scss', ['sass:dev', reload]);
});

// Aliasses, sub-tasks
gulp.task('build-sass', ['sass:dist'], function(){
	gulp.start('cssmin');
});
gulp.task('build-js', ['uglify']);
gulp.task('build-img', ['imagemin', 'svgmin']);

// Run once for deployment, build everything using above aliasses and run a cleanup task
gulp.task('default', ['build-sass', 'build-js', 'build-img'], function(){
	gulp.start('clean');
});
