# <%= appname %> static site generator with Pug

*By <%= appauthor %>, <%= appYear %>*

Source files are compiled (and copied) from the `src/` directory to the `dist/`. The `dist/` directory is empty by default and removed every time Grunt or Gulp launches to re-create / re-compile the source material to the destination `dist/` directory.

## Grunt or Gulp for compiling and serving the web site

To start working on your <%= appname %> project again, start a Terminal / command-line window `cd ` into the directory where the `Gruntfile.js` or `Gulpfile.js` reside and run the following command:

	grunt serve
    
Or when using Gulp:

	gulp serve

### File watchers

Grunt or Gulp will watch for file changes to the following files:

* `*.pug`
* `*.scss`
* `*.js`
* `*.img`

When any of these change Grunt or Gulp will compile / copy over those changes from the `src/` to the `dist/` directory and refresh the web browser.

Keep Grunt or Gulp running while working on your <%= appname %> project. To exit press the command below:

	ctrl + c
    
Followed by a `y`.

## Pug HTML templates

In the `src/` are Pug `*.pug` files. These are the source HTML files (and partials / include files) and watched by Grunt or Gulp to compile to the `dist/*.html` directory. To create more HTML pages just create a `*.pug` equivalant in the `src/` directory. Which, on save in your editor, will be compiled and copied to the `dest/`. This `dest/` directoy is served to the web browser with browser-sync / automatic reloading of the page.

### Example with master template

The `index.pug` file is an example Pug template file that uses a Pug **master** (see `src/extends/master.pug`) template via `extends extends/master`. This file is compiled to `dest/index.html`.

## Sass manifest and modules

The `src/scss/` directory holds a default Sass manifest file called `style.scss`. This file uses Sass `@import` lines to import various Sass partials. This `style.scss` is watched and compiled to `dist/css/style.css`.

## Resources

* [GruntJS.com](https://gruntjs.com)
* [GulpJS.com](https://gulpjs.com)
* [Sass-lang.com](http://sass-lang.com)
* [Sass language documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [PugJS.org](https://pugjs.org)
* [PugJS include files](https://pugjs.org/language/includes.html)
* [PugJS inheritance, block append / prepend](https://pugjs.org/language/inheritance.html)