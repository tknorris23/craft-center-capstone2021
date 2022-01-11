var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'classmysql.engr.oregonstate.edu',
	user: 'cs440_coppintr',
    password: '5897',
    database: 'cs440_coppintr'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;