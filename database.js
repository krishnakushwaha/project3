var mysql = require('mysql');


var db_config = {
      host: "localhost",
	  user: "root",
	  password: "123456",
	  database: "mydb",
   connectTimeout: 10000 //The milliseconds before a timeout occurs during
                         //the initial connection to the MySQL server.
};
var pool  = mysql.createPool(db_config);

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});

pool.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR' 
  // https://www.npmjs.com/package/mysql#error-handling
});

module.exports = pool;


