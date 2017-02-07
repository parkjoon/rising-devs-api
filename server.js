var bodyParser  = require('body-parser');
var cors = require('cors');
var express = require('express');
var mysql   = require('mysql');
var sha512 = require('js-sha512').sha512;
var rest = require('./rest.js');

var app = express();

function REST() {
	var self = this;
	self.connectMysql();
}

REST.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'root',
		password: 'park1402',
		database: 'rising_devs',
		debug: false
	});

	pool.getConnection(function(err, connection) {
		if(err) {
			self.stop(err);
		}
		else {
			self.configureExpress(connection);
		}
	});
};

REST.prototype.configureExpress = function(connection) {
	var self = this;
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cors({origin: 'http://localhost:3000'}));
	var router = express.Router();
	app.use('/api', router);
	var rest_router = new rest(router, connection, sha512);
	self.startServer();
};

REST.prototype.startServer = function() {
	app.listen(3001, function() {
		console.log('All right ! I am alive at Port 3001.');
	});
};

REST.prototype.stop = function(err) {
	console.log('ISSUE WITH MYSQL n' + err);
	process.exit(1);
};

new REST();
