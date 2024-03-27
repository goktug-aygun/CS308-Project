const mysql = require('mysql');

// MySQL Connection
const MySQL_connection = mysql.createConnection({
  host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'cs308project',
  database: 'CS308_MAIN_SQL_DATABASE'
});

MySQL_connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log("Connected to SQL Database");
});


module.exports = {MySQL_connection};
