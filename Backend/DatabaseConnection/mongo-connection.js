const mongoose = require('mongoose');

// MongoDB connection
const uri = "mongodb+srv://cs308:cs308Test@flightrosterdb.sm2ovjq.mongodb.net/cs308";

const Mongoose_Connection = mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


module.exports = { Mongoose_Connection, mongoose };

