const mysql = require('mysql');
const mongoose = require('mongoose');

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



// MongoDB connection
const uri = "mongodb+srv://cs308:cs308Test@test-db.1sxjsvf.mongodb.net/?retryWrites=true&w=majority&appName=test-db";

const Mongoose_Connection = mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Database');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


module.exports = {MySQL_connection, Mongoose_Connection, mongoose};
