const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

const DB_PASSWORD = process.env.DB_PASSWORD;

const connection = mysql.createConnection({
  host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: DB_PASSWORD,
  database: 'CS308_MAIN_SQL_DATABASE'
});

connection.connect();

module.exports = connection;