const h = require('../helper_functions')

const { MySQL_connection } = require("../DatabaseConnection/sql-connection");
const { Mongoose_Connection, mongoose } = require("../DatabaseConnection/mongo-connection");


const { PilotClass, insertPilot, PilotModel } = require("../Models/Pilot");


/* Delete Functions Start */

async function deleteSQL(deleteQuery, param, connection, callback, isLast, kind) {
    try {
        if (param == null) {
            await executeQuery(connection, deleteQuery, null);
            console.log(`All records are deleted for ${kind} instances`);
        }
        else {
            await executeQuery(connection, deleteQuery, param);
            console.log(`All records are deleted for ${kind} instances`);
        }

        callback();
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function deleteMongo() {
    try {
        await PilotModel.deleteMany({});
        console.log("All Pilot instances are deleted.");

    } catch (error) {
        console.error("Error deleting pilot objects");
        console.error(error);
    }
}
/* Delete Functions End */


async function insertPilotMongo(pilotInstance, isLast) {
    try {
        const { result } = await insertPilot(pilotInstance);
        if (isLast) {
            console.log("All Pilots inserted to MongoDB.");
            Mongoose_Connection.then(() => {
                // Use the aggregation framework to get the distinct pilot IDs
                return PilotModel.aggregate([
                    { $group: { _id: "$pilot_id" } },
                    { $count: "count" }
                ]);
            })
                .then(async () => {
                    const distinctPilotIds = await PilotModel.distinct('pilotID');
                    const numberOfDistinctPilots = distinctPilotIds.length;
                    console.log("Number of distinct pilot IDs:", numberOfDistinctPilots);
                })
                .catch(error => {
                    console.error("Error:", error);
                });

        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


/* SQL Functions Start */
const executeQuery = (connection, query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
};


function incrementQuerySQL() {
    if (completedQueriesSQL === queryToComplete) {
        console.log("All queries are completed. Closing MySQL connection.");
        MySQL_connection.end((err) => {
            if (err) {
                console.error('Error closing database connection:', err.stack);
                return;
            } else {
                console.log("MySQL Connection is closed.\n");
            }
        });
    }
}

async function insertPilotSQL(connection, personelSet, pilotSet) {
    try {
        // Personel Insert Query
        const personelInsertQuery = "INSERT INTO Personels SET ?;"
        const pilotInsertQuery = "INSERT INTO Pilots SET ?;"
        await executeQuery(connection, personelInsertQuery, personelSet);
        await executeQuery(connection, pilotInsertQuery, pilotSet);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


async function insertOneLanguageSqL(connection, parameters, callback, isLast) {
    try {
        // Language Insert Query
        const languageInsertQuery = "INSERT INTO KnownLanguages (personel_id, language) VALUES (?, ?);"
        await executeQuery(connection, languageInsertQuery, parameters);

        if (isLast) { callback(); }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


async function insertAllLanguagesSQL(languageData, pilotID) {
    try {

        for (let index = 0; index < languageData.length; index++) {
            const isLast = index === languageData.length - 1;
            const currLanguage = languageData[index];

            const params = [pilotID, currLanguage];

            /* await */insertOneLanguageSqL(MySQL_connection, params, incrementQuerySQL, isLast);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

/* SQL Functions End */

/* Main Start */


const mode = "i"; // Possible values are 'i' for insert and 'd' for delete 
var queryToComplete = 15000; // Use this variable to limit how many instances you want to insert
var completedQueriesSQL = 0;



if (mode == "d") {
    queryToComplete = 1;


    deleteSQL("DELETE FROM Pilots WHERE LENGTH(personel_id) = 7", null, MySQL_connection, incrementQuerySQL, false, "Pilot")
    deleteSQL("DELETE FROM CabinCrew WHERE LENGTH(personel_id) = 7", null, MySQL_connection, incrementQuerySQL, false, "CabinCrew")
    deleteSQL("DELETE FROM Personels WHERE LENGTH(personel_id) = 7", null, MySQL_connection, incrementQuerySQL, false, "Personel")
    deleteSQL("DELETE FROM KnownLanguages WHERE LENGTH(personel_id) = 7", null, MySQL_connection, incrementQuerySQL, true, "KnownLanguages")

    deleteMongo();
}
else if (mode == "i") {
    var completedQueriesSQL = 0;


    const IDSet = new Set();
    while (IDSet.size < queryToComplete) {
        const flightID = h.generateID("pilot");
        IDSet.add(flightID);
    }

    var IDArr = Array.from(IDSet);

    for (var i = 0; i < queryToComplete; i++) {

        var pilotID = IDArr[i];
        const { personelDict, pilotDict } = h.generatePilotData(pilotID);
        var languageData = h.generateLanguageData(personelDict["nationality"]);

        insertPilotSQL(MySQL_connection, personelDict, pilotDict);
        insertAllLanguagesSQL(languageData, pilotID);


        let name = personelDict["name"];
        let age = personelDict["age"];
        let gender = personelDict["gender"];
        let nationality = personelDict["nationality"];
        let veh_rest = personelDict["veh_rest"];
        let email = personelDict["email"];
        let sen_level = pilotDict["sen_level"];
        let max_range = pilotDict["max_range"];

        let pilotInstance = new PilotClass(pilotID, name, age, gender, sen_level, veh_rest, nationality, max_range, email, languageData, []);


        insertPilotMongo(pilotInstance, (i == queryToComplete - 1));
    }
}
