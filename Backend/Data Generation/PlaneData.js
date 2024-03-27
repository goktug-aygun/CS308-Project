const faker = require("faker");
const h = require("/Users/kayraozerk/Desktop/SABANCI 3.2/CS308/project_REPO/CS308-Project/Backend/helper_functions.js");
const mysql = require("mysql");
const connection = require("../Database Connection/sql-connection");
const { MongoClient } = require("mongodb");

// MongoDB connection setup
const uri =
  "mongodb+srv://cs308:cs308Test@flightrosterdb.sm2ovjq.mongodb.net/cs308";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  const uniquePlaneIDs = new Set();
  while (uniquePlaneIDs.size < 750) {
    const planeID = h.generateID("plane");
    uniquePlaneIDs.add(planeID);
  }
  console.log("Unique PlaneIDs generated");
  const planeIDs = Array.from(uniquePlaneIDs);

  const planeDataArray = []; // For MongoDB bulk insert

  for (let count = 0; count < planeIDs.length; count++) {
    const planeID = planeIDs[count];
    const PlaneType = [
      "Boeing 767",
      "Boeing 777",
      "Airbus A380",
      "Airbus A350",
    ][h.getRandomInt(0, 4)];

    let CrewLimit, PassengerLimit, SeniorityRestriction;

    switch (PlaneType) {
      case "Boeing 767": // 2  pilot  1 sen 4 jun 0 chef
        CrewLimit = 7;
        PassengerLimit = 50;
        SeniorityRestriction = 1;
        break;
      case "Boeing 777": // 2 pilot 2 sen 8 jun 1 chef
        CrewLimit = 13;
        PassengerLimit = 100;
        SeniorityRestriction = 2;
        break;
      case "Airbus A380": // 4 pilot 3 sen 12 jun 2 chef
        CrewLimit = 21;
        PassengerLimit = 150;
        SeniorityRestriction = 3;
        break;
      case "Airbus A350": // 4 pilot 4 sen 16 jun 2 chef
        CrewLimit = 26;
        PassengerLimit = 200;
        SeniorityRestriction = 4;
        break;
    }

    const seatLimit = CrewLimit + PassengerLimit;
    const planeData = {
      plane_id: planeID,
      type: PlaneType,
      level: SeniorityRestriction,
      passengerCapacity: PassengerLimit,
      crewCapacity: CrewLimit,
      seatCapacity: seatLimit,
    };

    // Prepare MongoDB data
    planeDataArray.push(planeData);

    // MySQL data insertion
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
      console.log("Inserted data for planeID:", planeID);
    });
  }

  // MongoDB bulk insert
  try {
    await client.connect();
    const database = client.db("cs308");
    const collection = database.collection("planes");
    const insertResult = await collection.insertMany(planeDataArray);
    console.log(
      `${insertResult.insertedCount} documents were inserted into MongoDB.`
    );
  } catch (err) {
    console.error("Error inserting data into MongoDB:", err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
