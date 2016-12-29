'use strict';

var generators = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = generators.Base.extend({
	_createProjectFileSystem: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			templateContext = {
				buildtool: this.buildtool,
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion				
			};

		// ---------------------------
		// Copy over files and directories
		// ---------------------------

		this.fs.copy(sourceRoot + '/src', destRoot + '/src');
		this.fs.copy(sourceRoot + '/.gitignore', destRoot + '/.gitignore');

		if(this.buildtool == 'Grunt') {
			this.fs.copy(sourceRoot + '/Gruntfile.js', destRoot + '/Gruntfile.js');
			this.fs.copyTpl(sourceRoot + '/package-grunt.json', destRoot + '/package.json', templateContext);
		} else {
			this.fs.copy(sourceRoot + '/Gulpfile.js', destRoot + '/Gulpfile.js');
			this.fs.copyTpl(sourceRoot + '/package-gulp.json', destRoot + '/package.json', templateContext);
		}

		// ---------------------------
		// Copy over (template) files
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.fs.copyTpl(sourceRoot + '/src/index.pug', destRoot + '/src/index.pug', templateContext);
		this.fs.copyTpl(sourceRoot + '/src/includes/config.pug', destRoot + '/src/includes/config.pug', templateContext);
	},
	_getPrompt: function() {
		var prompts = [
				{
					type: 'input',
					name: 'name',
					message: 'What is the name of this project?',
					default: this.appname
				},
				{
					type: 'input',
					name: 'description',
					message: 'What is the project description?',
				},
				{
					type: 'input',
					name: 'yourname',
					message: 'What is your name?',
				},
				{
					type: 'input',
					name: 'youremail',
					message: 'What is your e-mail address?',
				},
				{
					type: 'input',
					name: 'version',
					message: 'What is the version of your app?',
					default: '1.0.0'
				},
				{
					type: 'list',
					name: 'buildtool',
					message: 'Which buildtool would you like to use?',
					choices: ['Grunt', 'Gulp'],
					default: 0
				}
			];

			return prompts;
	},
	_saveAnswers: function(answers, callback) {
		this.buildtool = answers.buildtool;
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appauthor = answers.yourname;
		this.youremail = answers.youremail;
		this.appversion = answers.version;
		callback();
	},
	initializing: function() {
		var message = chalk.yellow.bold('Welcome to the Dutchwebworks ') + chalk.yellow('Pugsite generator');
		this.log(yosay(message, { maxLength: 15 }));
	},
	promting: function() {
		var done = this.async();

		this.prompt(this._getPrompt(), function(answers){	
			this._saveAnswers(answers, done);
		}.bind(this));
	},
	configuring: function() {
		this.config.save();
	},
	writing: function() {
		this._createProjectFileSystem();
	},
	install: function() {
		var message = chalk.yellow.bold('Running NPM install, hold on ...');
		this.log(yosay(message, { maxLength: 20 }));
		// this.npmInstall();
	},
	end: function() {
		if(this.buildtool == 'Grunt') {	
			// this.spawnCommand('grunt', ['serve']);
		} else {
			// this.spawnCommand('gulp', ['serve']);
		}
	}
});