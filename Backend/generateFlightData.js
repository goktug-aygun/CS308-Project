//INSERT INTO Flights (flight_id,destination,source,duration,distance,date_time,plane_id,shared_flight_company)
const { generateID, getRandomInt, getSeatNumber } = require('./helper_functions');
const connection = require('./sql-connection');
//flight_id generation
const uniqueFlightIDs = new Set();
// Keep generating flight IDs until we have 50 unique ones
while (uniqueFlightIDs.size < 50) {
    const flightID = generateID("flight");
    uniqueFlightIDs.add(flightID); // This will automatically handle duplicate prevention
}
// Convert the set to an array
const flightIDs = Array.from(uniqueFlightIDs);
// get location and destination randomly
const flights = {}; // Dictionary to store the flights
  
// Function to get a random source location
function getRandomSourceLocation(callback) {
    connection.query('SELECT airport_code FROM Locations ORDER BY RAND() LIMIT 1', (err, results) => {
    if (err) {
        callback(err);
        return;
    }
    callback(null, results[0].airport_code);
    });
}
  
// Function to get a random destination location
function getRandomDestinationLocation(sourceLocation, callback) {
    connection.query(`SELECT airport_code FROM Locations WHERE airport_code != ? ORDER BY RAND() LIMIT 1`, [sourceLocation], (err, results) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, results[0].airport_code);
    });
}
  
// Perform the queries sequentially
const totalQueries = 50;
let completedQueries = 0;
  
function performQueries() {
    for (let i = 0; i < totalQueries; i++) {
      getRandomSourceLocation((err, sourceLocation) => {
        if (err) {
          console.error('Error getting random source location:', err.stack);
          return;
        }
  
        getRandomDestinationLocation(sourceLocation, (err, destinationLocation) => {
          if (err) {
            console.error('Error getting random destination location:', err.stack);
            return;
          }
  
          // Use flight ID as the key in the sourceDestinationPairs object
          const flightID = flightIDs[i];
          flights[flightID] = { source: sourceLocation, destination: destinationLocation };
  
          completedQueries++;
  
          if (completedQueries === totalQueries) {
            // Close the connection after all queries are completed
            connection.end((err) => {
              if (err) {
                console.error('Error closing database connection:', err.stack);
                return;
              }
              console.log('Flights:', flights);
            });
          }
        });
      });
    }
}
  
performQueries();