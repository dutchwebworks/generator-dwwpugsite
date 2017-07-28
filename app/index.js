'use strict';

var Generator = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		var message = chalk.yellow.bold('Welcome to the Dutchwebworks ') + chalk.yellow('Pugsite generator');
		this.log(yosay(message, { maxLength: 15 }));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message	: 'What is the name of this project?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'description',
			message	: 'What is the project description?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'yourname',
			message	: 'What is your name?',
		}, {
			type    : 'input',
			name	: 'version',
			message	: 'What is the version of your app?',
			default	: '0.1.0'
		}, {
			type    : 'list',
			name	: 'buildtool',
			message	: 'Which buildtool would you like to use?',
			choices	: ['Grunt', 'Gulp'],
			default: 0
		}]).then((answers) => {
			this.buildtool = answers.buildtool;
			this.appname = answers.name;
			this.appdescription = answers.description;
			this.appauthor = answers.yourname;
			this.youremail = answers.youremail;
			this.appversion = answers.version;
		});
	}

	configuring() {
		this.config.save();
	}

	writing() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			templateContext = {
				buildtool: this.buildtool,
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion,
				appYear: new Date().getFullYear()
			};

		// ---------------------------
		// Copy over files and directories
		// ---------------------------

		this.fs.copy(sourceRoot + '/src', destRoot + '/src');
		this.fs.copy(sourceRoot + '/_gitignore', destRoot + '/.gitignore');

		if(this.buildtool == 'Grunt') {
			this.fs.copy(sourceRoot + '/Gruntfile.js', destRoot + '/Gruntfile.js');
			this.fs.copyTpl(sourceRoot + '/package-grunt.json', destRoot + '/package.json', templateContext);
		} else {
			this.fs.copy(sourceRoot + '/Gulpfile.js', destRoot + '/Gulpfile.js');
			this.fs.copyTpl(sourceRoot + '/package-gulp.json', destRoot + '/package.json', templateContext);
		}

		// ---------------------------
		// Copy over (template) files with placeholder filled answers
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/LICENSE', destRoot + '/LICENSE', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.fs.copyTpl(sourceRoot + '/src/index.pug', destRoot + '/src/index.pug', templateContext);
		this.fs.copyTpl(sourceRoot + '/src/helpers/config.pug', destRoot + '/src/helpers/config.pug', templateContext);
	}

	install() {
		var message = chalk.yellow.bold('Running NPM install, hold on ...');
		this.log(yosay(message, { maxLength: 20 }));
		this.npmInstall();
	}

	end() {
		if(this.buildtool == 'Grunt') {	
			this.spawnCommand('grunt', ['serve']);
		} else {
			this.spawnCommand('gulp', ['serve']);
		}
	}
};