var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
    password: '',
    database: 'test_craft_center',
    queueLimit: 0,
    connectionLimit: 0
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected to Database');
	}
});

module.exports.connection = connection;
