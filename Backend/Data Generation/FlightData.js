const { generateID, getRandomInt, getSeatNumber,
    getRandomSourceLocation, getRandomDestinationLocation, getRandomFlightCompanyName,
    calculateDistance, calculateDuration } = require('../helper_functions');

const {FlightClass,insertFlight,mongoose}=require('../Models/Flight');
const connection = require('../Database Connection/sql-connection');
var queryUpperLimit = 1;

//flight_id generation
const uniqueFlightIDs = new Set();
// generating flight IDs
while (uniqueFlightIDs.size < queryUpperLimit) {
    const flightID = generateID("flight");
    uniqueFlightIDs.add(flightID); // This will automatically handle duplicate prevention
}
// Convert the set to an array
const flightIDs = Array.from(uniqueFlightIDs);

const flights = {}; // Dictionary to store the flights

// Perform the queries sequentially
const totalQueries = queryUpperLimit;
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

                const shared = getRandomFlightCompanyName(); //get company name for shared flight

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

                        // proceed with calculations
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
                            // Add Flight Instance to MongoDB
                            const flightToAdd = new FlightClass(flightIDs[i],destinationLocation,sourceLocation,duration.toFixed(2),distance.toFixed(2),
                            randomTime.toISOString().slice(0, 19).replace('T', ' '),randomPlaneId,shared[0],shared[1]);
                            insertFlight(flightToAdd);

                            // INSERT statement to insert flight data into the Flights table
                            connection.query('INSERT INTO Flights SET ?', flights[flightIDs[i]], (err, results) => {
                                if (err) {
                                    console.error('Error inserting flight data:', err.stack);
                                    return;
                                }

                                completedQueries++;
                                console.log("Inserted ",completedQueries);
                                if (completedQueries === totalQueries) {
                                    // Close the connection after all queries are completed
                                    connection.end((err) => {
                                        if (err) {
                                            console.error('Error closing database connection:', err.stack);
                                            return;
                                        }
                                        // Optionally, you can close the MongoDB connection here too
                                        mongoose.connection.close();
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