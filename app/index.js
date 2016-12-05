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
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion				
			};

		// ---------------------------
		// Copy over files and directories
		// ---------------------------

		this.fs.copy(sourceRoot + '/app', destRoot + '/app');
		this.fs.copy(sourceRoot + '/.gitignore', destRoot + '/.gitignore');
		this.fs.copy(sourceRoot + '/package.json', destRoot + '/package.json');
		this.fs.copy(sourceRoot + '/README.md', destRoot + '/README.md');

		// ---------------------------
		// Copy over (template) files
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
	},
	_getPrompt: function() {
		var prompts = [
				{
					name: 'name',
					message: 'What is the name of this project?',
					default: this.appname
				},
				{
					name: 'description',
					message: 'What is the project description?',
				},
				{
					name: 'yourname',
					message: 'What is your name?',
				},
				{
					name: 'youremail',
					message: 'What is your e-mail address?',
				},
				{
					name: 'version',
					message: 'What is the version of your app?',
					default: '0.1.0'
				}
			];

			return prompts;
	},
	_saveAnswers: function(answers, callback) {
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appauthor = answers.yourname;
		this.youremail = answers.youremail;
		this.appversion = answers.version;
		callback();
	},
	initializing: function() {
		var message = chalk.yellow.bold('FIRST TEXT LINE') + chalk.yellow('SECOND TEXT LINE');
		this.log(yosay(message, { maxLength: 16 }));
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
		var message = chalk.yellow.bold('FIRST TEXT LINE');
		this.log(yosay(message, { maxLength: 22 }));
	},
	end: function() {
		// this.spawnCommand('npm', ['install']);
		// this.spawnCommand('gulp', ['serve', 'a-third-argument']);
	}
});