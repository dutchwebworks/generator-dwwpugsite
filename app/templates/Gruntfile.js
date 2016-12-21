module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt, {
		config: './package.json',
		scope: 'devDependencies'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),
		config: {
			dist: './dist',
			src: './src',
			htmlPath: '<%= config.dist %>',
			scssPath: '<%= config.src %>/scss',
			cssPath: '<%= config.dist %>/css',
			jsPathSrc: '<%= config.src %>/js',
			jsPathDest: '<%= config.dist %>/js',
			imgPathSrc: '<%= config.src %>/img',
			imgPathDest: '<%= config.dist %>/img'
		},

		watch: {
			options: {
				spawn: false
			},
			sass: {
				files: '<%= config.scssPath %>/**/*.scss',
				tasks: ['sass:dev']
			},
			pug: {
				files: '<%= config.src %>/**/*.pug',
				tasks: ['pug:dist']
			},
			js: {
				files: '<%= config.jsPathSrc %>/*.js',
				tasks: ['copy:js']
			},
			img: {
				files: '<%= config.imgPathSrc %>/*.{jpg,gif,svg}',
				tasks: ['copy:img']
			}
		},

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceMap: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.scssPath %>',
					src: ['*.scss'],
					dest: '<%= config.cssPath %>',
					ext: '.css',
				}]
			},
			dist: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: '<%= config.scssPath %>',
					src: ['*.scss'],
					dest: '<%= config.cssPath %>',
					ext: '.css',
				}]
			}
		},

		pug: {
			dist: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>',
					src: ['*.pug'],
					dest: '<%= config.dist %>',
					ext: '.html',
				}]
			}
		},

		copy: {
			js: {
				files: [{
					expand: true,
					cwd: '<%= config.jsPathSrc %>',
					src: ['**'],
					dest: '<%= config.jsPathDest %>'
				}]
			},
			img: {
				files: [{
					expand: true,
					cwd: '<%= config.imgPathSrc %>',
					src: ['**'],
					dest: '<%= config.imgPathDest %>'
				}]
			}
		},

		clean: {
			dist: ['<%= config.dist %>']
		},

		browserSync: {
			site: {
				options: {
					watchTask: true,
					debugInfo: true,
					excludedFileTypes: ["map"],
					ghostMode: {
						clicks: true,
						scroll: true,
						links: true,
						forms: false
					},
					server: {
						baseDir: '<%= config.dist %>'
					}
				},	
				bsFiles: {
					src: [
						'<%= config.cssPath %>/*.css',
						'<%= config.jsPathDest %>/*.js',
						'<%= config.src %>/js/*.js',
						'<%= config.htmlPath %>/*.html'
					]	
				}				
			}
		},
	});

	grunt.registerTask('build', 'Compile Pug templates and Sass to Css. Copy over Css and images files.', [
		'clean:dist',
		'pug',
		'sass:dist',
		'copy'
	]);

	grunt.registerTask('serve', 'Run browser-sync proxy server, with livereload and with file watcher for Pug- and Sass files', [
		'build',
		'browserSync',
		'watch'
	]);

	grunt.registerTask('default', 'Run build task', [
		'build',
	]);
};