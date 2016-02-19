'use strict';

var path = process.cwd();
var Shortener = require(process.cwd() + '/app/controllers/short.controller.server.js');

module.exports = function (app, passport) {


	var shortener = new Shortener();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/new/*')
		.get(shortener.make);

	app.route('/:id')
		.get(shortener.get);

};
