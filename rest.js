var mysql = require('mysql');

function REST_ROUTER(router, connection, sha512) {
	var self = this;
	self.handleRoutes(router, connection, sha512);
}

REST_ROUTER.prototype.handleRoutes= function(router, connection, sha512) {
	router.get('/', function(req, res) {
		res.json({'Message' : 'Hello World !'});
	})

	router.get('/jobs',function(req, res) {
        var query = 'SELECT * FROM ??';
        var table = ['job_posts'];
        query = mysql.format(query, table);
        connection.query(query, function(err,rows){
            if(err) {
                res.json({'Error' : true, 'Message' : 'Error executing MySQL query'});
            }
			else {
                res.json({'Error' : false, 'Message' : 'Success', 'jobs' : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;
