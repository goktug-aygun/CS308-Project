//INSERT INTO Flights (flight_id,destination,source,duration,distance,date_time,plane_id,shared_flight_company_id, shared_flight_company_name)
const { generateID, getRandomInt, getSeatNumber,
  getRandomSourceLocation,getRandomDestinationLocation,getRandomFlightCompanyName,
  calculateDistance,calculateDuration} = require('../helper_functions');
const connection = require('../Database Connection/sql-connection');

//flight_id generation
const uniqueFlightIDs = new Set();
// generating flight IDs
while (uniqueFlightIDs.size < 1) {
    const flightID = generateID("flight");
    uniqueFlightIDs.add(flightID); // This will automatically handle duplicate prevention
}
console.log("uniqueFlightIDs generated");
// Convert the set to an array
const flightIDs = Array.from(uniqueFlightIDs);

// get location and destination randomly
const flights = {}; // Dictionary to store the flights
// Perform the queries sequentially
const totalQueries = 1;
let completedQueries = 0;

function generateFlights() {
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

                const shared = getRandomFlightCompanyName();

                let coordinates = [];
                // get the coordinates from the source location
                connection.query('SELECT * FROM Locations WHERE airport_code = ?', [sourceLocation], (err, results) => {
                    if (err) {
                        console.error('Error querying source location:', err.stack);
                        return;
                    }
                    coordinates.push(results[0].latitude);
                    coordinates.push(results[0].longitude);

                    // get the coordinates from the destination location
                    connection.query('SELECT * FROM Locations WHERE airport_code = ?', [destinationLocation], (err, results) => {
                        if (err) {
                            console.error('Error querying destination location:', err.stack);
                            return;
                        }
                        coordinates.push(results[0].latitude);
                        coordinates.push(results[0].longitude);

                        // Now that coordinates array is populated, proceed with calculations
                        const distance = calculateDistance(coordinates);
                        const duration = calculateDuration(distance);

                        
                        const todayDateTime = new Date("2024-01-20 06:00:00");
                        const oneYearAfterDateTime = new Date("2025-01-20 06:00:00");
                        // Generate random timestamp within constraints
                        const maxOffset = duration * 3600 * 1000; // Convert duration to milliseconds
                        const randomTime = new Date(todayDateTime.getTime() + Math.random() * (oneYearAfterDateTime.getTime() - todayDateTime.getTime()));
                        const minTime = new Date(randomTime.getTime() - maxOffset);
                        const maxTime = new Date(randomTime.getTime() + maxOffset);
                        
                        // Query available planes within the time window
                        connection.query('SELECT plane_id FROM Planes WHERE plane_id NOT IN (SELECT plane_id FROM Flights WHERE date_time BETWEEN ? AND ?)', [minTime, maxTime], (err, results) => {
                            if (err) {
                                console.error('Error querying available planes:', err.stack);
                                return;
                            }

                            if (results.length === 0) {
                                console.error('No available planes within the time window.');
                                return;
                            }

                            const availablePlanes = results.map(result => result.plane_id);
                            const randomPlaneId = availablePlanes[getRandomInt(0, availablePlanes.length)];

                            flights[flightIDs[i]] = {
                                flight_id: flightIDs[i],
                                destination: destinationLocation,
                                source: sourceLocation,
                                duration: duration.toFixed(2),
                                distance: distance.toFixed(2),
                                date_time: randomTime.toISOString().slice(0, 19).replace('T', ' '), // Convert to MySQL DATETIME format
                                plane_id: randomPlaneId,
                                shared_flight_company: shared[0],
                                shared_flight_company_name: shared[1]
                            };

                            // INSERT statement to insert flight data into the Flights table
                            connection.query('INSERT INTO Flights SET ?', flights[flightIDs[i]], (err, results) => {
                                if (err) {
                                    console.error('Error inserting flight data:', err.stack);
                                    return;
                                }

                                console.log(completedQueries + 1); // print the current completed query number
                                completedQueries++;

                                if (completedQueries === totalQueries) {
                                    // Close the connection after all queries are completed
                                    connection.end((err) => {
                                        if (err) {
                                            console.error('Error closing database connection:', err.stack);
                                            return;
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    }
}
generateFlights();