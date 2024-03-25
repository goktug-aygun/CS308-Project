const faker = require("faker");
const h = require("/Users/kayraozerk/Desktop/SABANCI 3.2/CS308/project_REPO/CS308-Project/Backend/helper_functions.js");
const mysql = require("mysql");
const connection = require("../Database Connection/sql-connection");

const uniquePlaneIDs = new Set();
// generating plane IDs
while (uniquePlaneIDs.size < 750) {
  const planeID = h.generateID("plane");
  uniquePlaneIDs.add(planeID); // This will automatically handle duplicate prevention
}
console.log("unique PlaneIDs generated");
// Convert the set to an array
const planeIDs = Array.from(uniquePlaneIDs);

for (var count = 0; count < 750; count++) {
  var planeID = planeIDs[count];

  var PlaneType = ["Boeing 767", "Boeing 777", "Airbus A380", "Airbus A350"].at(
    h.getRandomInt(0, 4)
  );

  var CrewLimit;
  var PassengerLimit;
  var SeniorityRestriction;

  if (PlaneType == "Boeing 767") {
    // 2  pilot  1 sen 4 jun 0 chef
    CrewLimit = 7;
    PassengerLimit = 50;
    SeniorityRestriction = 1;
  } else if (PlaneType == "Boeing 777") {
    // 2 pilot 2 sen 8 jun 1 chef
    CrewLimit = 13;
    PassengerLimit = 100;
    SeniorityRestriction = 2;
  } else if (PlaneType == "Airbus A380") {
    // 4 pilot 3 sen 12 jun 2 chef
    CrewLimit = 21;
    PassengerLimit = 150;
    SeniorityRestriction = 3;
  } else if (PlaneType == "Airbus A350") {
    // 4 pilot 4 sen 16 jun 2 chef
    CrewLimit = 26;
    PassengerLimit = 200;
    SeniorityRestriction = 4;
  }

  var seatLimit = CrewLimit + PassengerLimit;

  const query = `INSERT INTO Planes (plane_id, type, level, passengerCapacity, crewCapacity, seatCapacity) VALUES (?,?,?,?,?,?)`;
  const parameters = [
    planeID,
    PlaneType,
    SeniorityRestriction,
    PassengerLimit,
    CrewLimit,
    seatLimit,
  ];

  connection.query(query, parameters, (err, results, fields) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return;
    }
    // Success message or further processing here
    console.log("Inserted data for planeID:", planeID);
  });
}

/*
const faker = require("faker");
const h = require("/Users/kayraozerk/Desktop/SABANCI 3.2/CS308/project_REPO/CS308-Project/Backend/helper_functions.js");
const mysql = require("mysql");
const connection = require("../Database Connection/sql-connection");

for (var count = 0; count < 10; count++) {
  {
    var planeID = h.generateID("plane");

    var PlaneType = [
      "Boeing 767",
      "Boeing 777",
      "Airbus A380",
      "Airbus A350",
    ].at(h.getRandomInt(0, 4));

    var CrewLimit;
    var PassengerLimit;

    if (PlaneType == "Boeing 767") {
      CrewLimit = 5;
      PassengerLimit = 50;
      seniorityRestiriction = 1;
    } else if (PlaneType == "Boeing 777") {
      CrewLimit = 10;
      PassengerLimit = 100;
      seniorityRestiriction = 2;
    } else if (PlaneType == "Airbus A380") {
      CrewLimit = 15;
      PassengerLimit = 150;
      seniorityRestiriction = 3;
    } else if (PlaneType == "Airbus A350") {
      CrewLimit = 20;
      PassengerLimit = 200;
      seniorityRestiriction = 4;
    }

    var seatLimit = CrewLimit + PassengerLimit;

    
     console.log(`PlaneID : ${planeID}`);
    console.log(`Plane Type : ${PlaneType}`);
    console.log(`Seniority Level : ${seniorityRestiriction}`);
    console.log(`Passenger Limit : ${PassengerLimit}`);
    console.log(`Crew Limit : ${CrewLimit}`);
    console.log(`Seat Limit : ${seatLimit}`);
    console.log("----------"); 
    
  }

  parameters = [
    planeID,
    PlaneType,
    seniorityRestiriction,
    PassengerLimit,
    CrewLimit,
    seatLimit,
  ];
}

*/
