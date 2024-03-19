//INSERT INTO Flights (flight_id,destination,source,duration,distance,date_time,plane_id,shared_flight_company_id, shared_flight_company_name)
const { generateID, getRandomInt, getSeatNumber ,getRandomSourceLocation,getRandomDestinationLocation,getRandomFlightCompanyName} = require('./helper_functions');
const connection = require('./sql-connection');
//flight_id generation
const uniqueFlightIDs = new Set();
// Keep generating flight IDs until we have 50 unique ones
while (uniqueFlightIDs.size < 100) {
    const flightID = generateID("flight");
    uniqueFlightIDs.add(flightID); // This will automatically handle duplicate prevention
}
// Convert the set to an array
const flightIDs = Array.from(uniqueFlightIDs);
// get location and destination randomly
const flights = {}; // Dictionary to store the flights
// Perform the queries sequentially
const totalQueries = 10;
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
          //get shared flight information with 0.1 probability
          const shared = getRandomFlightCompanyName();
          // Use flight ID as the key in the sourceDestinationPairs object
          flights[flightIDs[i]]={source: sourceLocation, destination: destinationLocation, shared_flight_company_id:shared[0],shared_flight_company_name: shared[1]};
          console.log(completedQueries+1);
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