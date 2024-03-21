const connection = require('../Database Connection/sql-connection');
const {getRandomInt}= require('../helper_functions');

//Need to also insert to mongodb database

//Pilot vehicle restriction: The type (single) of vehicle that the pilot can operate. (DONE)
//Pilot allowed range: Maximum allowed distance that the pilot can be assigned to (DONE)
//Each flight should contain at least one single and one junior pilot where some flights may involve at most two trainees. (DONE??)
//In each flight there should be 1-4 senior attendants, 4-16 junior attendants and 0-2 chefs. (DONE??)
//Attendant vehicle restriction: The types (multiple) of vehicles that the attendant can participate in. (DONE)
//flighttime-+duration (DONE??)

function assignCrewAndPilotsToFlights() {
    // Query to get all flights
    const flightQuery = `
        SELECT f.flight_id, f.duration, f.distance,f.date_time,f.plane_id,p.level
        FROM Flights f
        INNER JOIN Planes p ON f.plane_id = p.plane_id
        GROUP BY f.flight_id`;

    // Execute query
    connection.query(flightQuery, (error, results) => {
        if (error) throw error;
        // Iterate through flights
        results.forEach(flight => {
            const flight_id = flight.flight_id;
            const duration = flight.duration;
            const distance = flight.distance;
            const date_time = flight.date_time;
            const plane_id= flight.plane_id;
            const plane_level = flight.level;
            const maxOffset = duration * 3600 * 1000; // Convert duration to milliseconds
            // Query to find available crew members
            const crewQuery = `
                SELECT * 
                FROM CrewMembers 
                WHERE max_range >= ${distance} AND veh_rest >= ${plane_level}
                AND crew_id NOT IN (SELECT crew_id FROM FlightCrew INNER JOIN Flights ON FlightCrew.flight_id=Flights.flight_id
                    WHERE Flights.date_time BETWEEN ? AND ?)`;

            var minTime=new Date(date_time.getTime() - maxOffset);
            var maxTime=new Date(date_time.getTime() + maxOffset);
            // Execute crew query
            connection.query(crewQuery,[minTime, maxTime], (error, crewResults) => {
                if (error) throw error;
                // Find the available senior,junior and chef crew members
                let seniorCrewIds = [];
                crewResults.forEach(crew => {
                    if (crew.att_type === 'S') {
                        seniorCrewIds.push(crew.crew_id);
                    }
                });
                let juniorCrewIds = [];
                crewResults.forEach(crew => {
                    if (crew.att_type === 'J') {
                        juniorCrewIds.push(crew.crew_id);
                    }
                });
                let chefCrewIds = [];
                crewResults.forEach(crew => {
                    if (crew.att_type === 'C') {
                        chefCrewIds.push(crew.crew_id);
                    }
                });

                let crewToInsert = [];
                //Select 1-4 senior attendant
                for (let index = 0; index < getRandomInt(1,5); index++) {
                    let seniorToPush = seniorCrewIds[getRandomInt(0, seniorCrewIds.length)];
                    crewToInsert.push(seniorToPush);
                    let seniorIndex = seniorCrewIds.indexOf(seniorToPush);
                    if (seniorIndex !== -1) {seniorCrewIds.splice(seniorIndex, 1);}
                }
                //Select 4-16 junior attendant
                for (let index = 0; index < getRandomInt(4,17); index++) {
                    let juniorToPush = juniorCrewIds[getRandomInt(0, juniorCrewIds.length)];
                    crewToInsert.push(juniorToPush);
                    let juniorIndex = juniorCrewIds.indexOf(juniorToPush);
                    if (juniorIndex !== -1) {juniorCrewIds.splice(juniorIndex, 1);}
                }   
                //Select 0-2 chefs             
                for (let index = 0; index < getRandomInt(0,3); index++) {
                    let chefToPush = chefCrewIds[getRandomInt(0, chefCrewIds.length)];
                    crewToInsert.push(chefToPush);
                    let chefIndex = chefCrewIds.indexOf(chefToPush);
                    if (chefIndex !== -1) {chefCrewIds.splice(chefIndex, 1);}
                }
                
                // Query to find available pilots
                const pilotQuery = `
                SELECT * 
                FROM Pilots 
                WHERE max_range >= ${distance} AND veh_rest = ${plane_level}
                AND pilot_id NOT IN (SELECT pilot_id FROM FlightCrew INNER JOIN Flights ON FlightCrew.flight_id=Flights.flight_id
                    WHERE Flights.date_time BETWEEN ? AND ?)`;
                
                // Execute pilot query
                connection.query(pilotQuery, [minTime, maxTime], (error, pilotResults) => {
                    if (error) throw error;
                    // Find the available senior,junior and trainee pilots
                    let seniorPilotIds = [];
                    pilotResults.forEach(pilot => {
                        if (pilot.sen_level === 'S') {
                            seniorPilotIds.push(pilot.pilot_id);
                        }
                    });
                    let juniorPilotIds = [];
                    pilotResults.forEach(pilot => {
                        if (pilot.sen_level === 'J') {
                            juniorPilotIds.push(pilot.pilot_id);
                        }
                    });
                    let traineePilotIds = [];
                    pilotResults.forEach(pilot => {
                        if (pilot.sen_level === 'T') {
                            traineePilotIds.push(pilot.pilot_id);
                        }
                    })

                    let pilotsToInsert = [];
                    //Select senior pilot
                    let seniorToPush = seniorPilotIds[getRandomInt(0, seniorPilotIds.length)];
                    pilotsToInsert.push(seniorToPush);
                    let seniorIndex = seniorPilotIds.indexOf(seniorToPush);
                    seniorPilotIds.splice(seniorIndex, 1);
                    
                    //Select junior pilot
                    let juniorToPush = juniorPilotIds[getRandomInt(0, juniorPilotIds.length)];
                    pilotsToInsert.push(juniorToPush);
                    let juniorIndex = juniorPilotIds.indexOf(juniorToPush);
                    juniorPilotIds.splice(juniorIndex, 1);
                     
                    //Select at most two trainee pilots             
                    for (let index = 0; index < getRandomInt(0,3); index++) {
                        let traineeToPush = traineePilotIds[getRandomInt(0, traineePilotIds.length)];
                        pilotsToInsert.push(traineeToPush);
                        let traineeIndex = traineePilotIds.indexOf(traineeToPush);
                        if (traineeIndex !== -1) {traineePilotIds.splice(traineeIndex, 1);}
                    }

                    // Insert crew and pilot into FlightCrew table
                    for (let i = 0; i < pilotsToInsert.length; i++) {
                        const pilot_id = pilotsToInsert[i];
                        const crew_id = crewToInsert[i];
                    
                        const insertQuery = `
                            INSERT INTO FlightCrew (flight_id, pilot_id, crew_id) 
                            VALUES ('${flight_id}', '${pilot_id}','${crew_id}')`;
                        connection.query(insertQuery, (error) => {
                            if (error) throw error;
                        });
                    }
                    const remainingCrew = crewToInsert.slice(pilotsToInsert.length);
                    remainingCrew.forEach(crew_id => {
                        const insertQuery = `
                            INSERT INTO FlightCrew (flight_id,crew_id) 
                            VALUES ('${flight_id}', '${crew_id}')`;
                        connection.query(insertQuery, (error) => {
                            if (error) throw error;
                        });
                    });
                });
            });
        });
        connection.end();
    });
}
assignCrewAndPilotsToFlights();