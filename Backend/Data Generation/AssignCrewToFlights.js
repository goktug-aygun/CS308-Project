const connection = require('../Database Connection/sql-connection');
const {getRandomInt}= require('../helper_functions');
const {assignToFlight}=require('../Models/Flight');

function assignCrewAndPilotsToFlights() {
    let i=1;
    // Query to get all flights
    const flightQuery = `
        SELECT f.flight_id, f.duration, f.distance,f.date_time,p.level,p.crewCapacity,p.passengerCapacity
        FROM Flights f
        INNER JOIN Planes p ON f.plane_id = p.plane_id
        GROUP BY f.flight_id`;

    // Execute query to get the flights
    connection.query(flightQuery, (error, results) => {
        if (error) throw error;
        // Iterate through flights
        results.forEach(flight => {
            const flight_id = flight.flight_id;
            const duration = flight.duration;
            const distance = flight.distance;
            const date_time = flight.date_time;
            const plane_level = flight.level;
            const crewCapacity=flight.crewCapacity;
            const passengerCapacity=flight.passengerCapacity;
            const maxOffset = duration * 3600 * 1000; // Convert duration to milliseconds
            // Query to find available crew members
            const crewQuery = `
                SELECT C.personel_id,C.att_type 
                FROM Personels P 
                INNER JOIN CabinCrew C ON P.personel_id=C.personel_id
                WHERE P.veh_rest >= ${plane_level}
                AND C.personel_id NOT IN (SELECT personel_id FROM FlightCrew INNER JOIN Flights ON FlightCrew.flight_id=Flights.flight_id
                    WHERE Flights.date_time BETWEEN ? AND ?)`;
  
            var minTime=new Date(date_time.getTime() - maxOffset);
            var maxTime=new Date(date_time.getTime() + maxOffset);
            // Execute crew query
            connection.query(crewQuery,[minTime, maxTime], (error, crewResults) => {
                if (error) throw error;
                // Find the available senior,junior and chef crew members
                let seniorCrewIds = [];
                let juniorCrewIds = [];
                let chefCrewIds = [];
                crewResults.forEach(crew => {
                    if (crew.att_type === 'S') {
                        seniorCrewIds.push(crew.personel_id);
                    }
                    else if (crew.att_type === 'J') {
                        juniorCrewIds.push(crew.personel_id);
                    }
                    else {
                        chefCrewIds.push(crew.personel_id);
                    }
                });
                let chefCount=0;
                /* if flight duration is less than 4 hours, no food service is available */
                let seniorCount = 0;
                if (passengerCapacity==120){seniorCount=1;}
                else if (passengerCapacity==180){seniorCount=2;}
                else if (passengerCapacity==240){seniorCount=3;}
                else {seniorCount=4;}
                let juniorCount = 4 * seniorCount;

                if (duration>=4){
                    chefCount=1;
                    if (duration >=12){chefCount=2;}
                }
                if( (seniorCrewIds.length < seniorCount) || (juniorCrewIds.length<juniorCount) || (chefCrewIds.length < chefCount) )
                {
                    console.log("Cant assign to flight",flight_id,"due to limited number of available crew members.");
                    return;
                }
                let crewToInsert = [];  
                //Select senior attendant             
                for (let index = 0; index < seniorCount; index++) {
                    let seniorToPush = seniorCrewIds[getRandomInt(0, seniorCrewIds.length)];
                    crewToInsert.push(seniorToPush);
                    let seniorIndex = seniorCrewIds.indexOf(seniorToPush);
                    if (seniorIndex !== -1) {seniorCrewIds.splice(seniorIndex, 1);}
                }
                //Select junior attendant
                for (let index = 0; index < juniorCount; index++) {
                    let juniorToPush = juniorCrewIds[getRandomInt(0, juniorCrewIds.length)];
                    crewToInsert.push(juniorToPush);
                    let juniorIndex = juniorCrewIds.indexOf(juniorToPush);
                    if (juniorIndex !== -1) {juniorCrewIds.splice(juniorIndex, 1);}
                }   
                //Select 0-2 chefs    
                for (let index = 0; index < chefCount; index++) {
                    let chefToPush = chefCrewIds[getRandomInt(0, chefCrewIds.length)];
                    crewToInsert.push(chefToPush);
                    let chefIndex = chefCrewIds.indexOf(chefToPush);
                    if (chefIndex !== -1) {chefCrewIds.splice(chefIndex, 1);}
                }
                
                // Query to find available pilots
                const pilotQuery = `
                SELECT Pl.personel_id,Pl.sen_level 
                FROM Personels P
                INNER JOIN Pilots Pl ON P.personel_id = Pl.personel_id 
                WHERE Pl.max_range >= ${distance} AND P.veh_rest = ${plane_level}
                AND Pl.personel_id NOT IN (SELECT personel_id FROM FlightCrew INNER JOIN Flights ON FlightCrew.flight_id=Flights.flight_id
                  WHERE Flights.date_time BETWEEN ? AND ?)`;

                // Execute pilot query
                connection.query(pilotQuery, [minTime, maxTime], (error, pilotResults) => {
                    if (error) throw error;
                    // Find the available senior,junior and trainee pilots
                    let seniorPilotIds = [];
                    let juniorPilotIds = [];
                    let traineePilotIds = [];
                    pilotResults.forEach(pilot => {
                        if (pilot.sen_level === 'S') {seniorPilotIds.push(pilot.personel_id);}
                        else if (pilot.sen_level === 'J') {juniorPilotIds.push(pilot.personel_id);}
                        else {traineePilotIds.push(pilot.personel_id);}
                    });
                    if( (seniorPilotIds.length < 1) || (juniorPilotIds.length<1) ){
                        console.log("Cant assign to flight",flight_id,"due to limited number of available pilots.");
                        return;
                    }
                    let pilotsToInsert = [];
                    //Select senior pilot
                    let seniorToPush = seniorPilotIds[getRandomInt(0, seniorPilotIds.length)];
                    pilotsToInsert.push(seniorToPush);
                    let seniorIndex = seniorPilotIds.indexOf(seniorToPush);
                    if (seniorIndex !== -1) seniorPilotIds.splice(seniorIndex, 1);
                    
                    //Select junior pilot
                    let juniorToPush = juniorPilotIds[getRandomInt(0, juniorPilotIds.length)];
                    pilotsToInsert.push(juniorToPush);
                    let juniorIndex = juniorPilotIds.indexOf(juniorToPush);
                    if (juniorIndex !== -1) juniorPilotIds.splice(juniorIndex, 1);
                    
                    //Select at most two trainee pilots     
                    let currentAvailableCrewNum=crewCapacity-2-crewToInsert.length;  
                    let traineeCount=2;
                    if (currentAvailableCrewNum<=0 || traineePilotIds.length==0){traineeCount=0;}
                    else if (currentAvailableCrewNum==1 || traineePilotIds.length==1){traineeCount=1;}      
                   
                    for (let index = 0; index < traineeCount; index++) {
                        let traineeToPush = traineePilotIds[getRandomInt(0, traineePilotIds.length)];
                        pilotsToInsert.push(traineeToPush);
                        let traineeIndex = traineePilotIds.indexOf(traineeToPush);
                        if (traineeIndex !== -1) {traineePilotIds.splice(traineeIndex, 1);}
                    }
                    //Plane's crew capacity check
                    if(pilotsToInsert.length + crewToInsert.length >crewCapacity) {
                        console.log("Cant assign to flight",flight_id,"due crewCapacity being low.", crewCapacity,"<",pilotsToInsert.length+crewToInsert.length);
                        return;
                    }
                    // Insert crew and pilot into FlightCrew table
                    console.log("Gathered all members for flight:",i);
                    i++;
                    //MongoDB insertion
                    assignToFlight(flight_id,crewToInsert,pilotsToInsert);

                    for (let i = 0; i < pilotsToInsert.length; i++) {
                        const pilot_id = pilotsToInsert[i];
                        const insertQuery = `
                            INSERT INTO FlightCrew (flight_id, personel_id) 
                            VALUES ('${flight_id}', '${pilot_id}')`;
                        connection.query(insertQuery, (error) => {
                            if (error) throw error;
                        });
                    }

                    for (let index = 0; index < crewToInsert.length; index++) {
                        const crew_id = crewToInsert[index];
                        const insertQuery = `
                            INSERT INTO FlightCrew (flight_id, personel_id) 
                            VALUES ('${flight_id}', '${crew_id}')`;
                        connection.query(insertQuery, (error) => {
                            if (error) throw error;
                        });    
                    }                
                   
                });
            });
        });
    });
}
assignCrewAndPilotsToFlights();