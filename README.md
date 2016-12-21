## Pugsite Yeoman generator

Simple web site using Pug templates and Grunt

*By Dennis Burger, december 2016*

## One time installation

Make sure NodeJS is installed by going to the [NodeJS website](https://nodejs.org/en/), download and install it for your operating system. This will also make the `npm` command-line tool available.

Open a **command-line window** (Terminal or MS-DOS) and type the following to globally (`-g`) install the above required NPM components all in one go:

	npm install -g yo

## Download this Yeoman generator

Before you can use this generator you need to download it. Run the command below to **globally** install this generator.

	npm install -g generator-dwwpugsite

### Check globally installed NPM packages

To view your globally installed NPM list type the following. The new Yeoman generator should be listed here.

	npm ls -g --depth=0

## Using this generator in a new project

Create and `cd` to a new (empty) project directory where we'll use this generator as a starting point for a new project. Now type:

	yo dwwpugsite

### Yeoman questions

You will be greated by Yeoman and it will ask you some basic questions regarding this project. This **meta-data information** is used inside some of the Yeoman generated files.

Finally a web browser will open with `http://localhost:3000`. In the background Grunt is watching for changes to the following files:

* *.pug
* *.scss
* *.js
* *.img

When any of these change Grunt will compile / copy over those changes from the `src/` to the `dist/` directory and refresh the web browser.

## Unlinking this Yeoman generator

To unlink this Yeoman generator, type:

	npm uninstall -g generator-dwwpugsite