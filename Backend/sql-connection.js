const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'cs308project',
  database: 'CS308_MAIN_SQL_DATABASE'
});

connection.connect();
module.exports = connection;