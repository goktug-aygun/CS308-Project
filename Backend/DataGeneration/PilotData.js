const mysql = require('mysql');
const { MySQL_connection, Mongoose_Connection, mongoose } = require("../DatabaseConnection/sql-connection");

const h = require('../helper_functions')
const { PilotClass, LanguageClass, insertPilot, insertLanguage, PilotModel, LanguageModel } = require("../Models/Pilot");


var deneme = []




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

        LanguageModel.updateMany({}, { $set: { pilotID: null } })
            .then(() => {
                console.log("All records for (Language-Pilot) pairs are deleted.");
            })
            .catch(err => {
                console.error('Error updating pilot-language:', err);
            });
        LanguageModel.deleteMany({ crewID: null, pilotID: null })
            .then(result => {
                console.log("All records for empty language pairs deleted.");
                mongoose.connection.close();
                console.log("MongoDB connection is closed.");
            })
            .catch(err => {
                console.error('Error updating pilot-language:', err);
            });

    } catch (error) {
        console.error("Error deleting pilot objects");
        console.error(error);
    }
}
/* Delete Functions End */

/* Mongo Functions Start */
function incrementQueryMongo() {
    completedQueriesMongo++;
    if (completedQueriesMongo === queryToComplete) {
        console.log("All queries are completed. Closing MongoDB connection.");
        mongoose.connection.close();
    }
}

async function insertPilotMongo(pilotInstance) {
    try {
        const { result } = await insertPilot(pilotInstance);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function insertOneLanguageMongo(languageInstance) {
    try {
        const currLanguage = languageInstance.language;
        const pilot_id = languageInstance.pilotID;


        const findResult = await LanguageModel.find({ pilotID: null, language: currLanguage });
        if (findResult.length == 0) {
            await insertLanguage(languageInstance);
        }
        else {
            var id = result[0]._id.toString();
            const updateResult = await LanguageModel.updateOne({ _id: id }, { $set: { pilotID: pilot_id } })
            if (updateResult.ok == 0) { console.log(`Error inserting the language ${currLanguage}. `); }
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


let flag = true;
async function insertAllLanguagesMongo(languageData, pilotID) {
    try {
        const promises = [];

        languageData.forEach((currLanguage, index) => {
            const isLast = index === languageData.length - 1;
            const languageInstance = new LanguageClass(pilotID, null, currLanguage);

            const promise = insertOneLanguageMongo(languageInstance, incrementQueryMongo, isLast);
            promises.push(promise);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        flag = false;
        // incrementQueryMongo();

    } catch (error) {
        console.error('Error:', error);
    }
}
/* Mongo Functions End */

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
    ++completedQueriesSQL;
    console.log(completedQueriesSQL);
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

async function insertPilotSQL(pilotInsertQuery, connection, parameters) {
    try {
        await executeQuery(connection, pilotInsertQuery, parameters);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}


async function insertOneLanguageSqL(connection, parameters, callback, isLast) {
    try {
        let available = false;
        const langSearchQuery1 = "SELECT * FROM KnownLanguages WHERE language = ? AND pilot_id IS NULL LIMIT 1;";

        const { results, fields } = await executeQuery(connection, langSearchQuery1, parameters[1]);


        
        if (results.length == 0) // no available spot, create new row
        {
            console.log(`results length ${results.length} ekledim`);
            const languageInsertQuery = 'INSERT INTO KnownLanguages (pilot_id, language) VALUES (?,?)';
            await executeQuery(connection, languageInsertQuery, parameters);
        }
        else // there are empty places, can swap values
        {
            console.log(`results length ${results.length} updateledim`);
            const languageUpdateQuery = "UPDATE KnownLanguages SET pilot_id = ? where language = ? AND pilot_id IS NULL LIMIT 1;"
            await executeQuery(connection, languageUpdateQuery, parameters);
        }
        // const languageInsertQuery = 'INSERT INTO KnownLanguages (pilot_id, language) VALUES (?,?)';
        // await executeQuery(connection, languageInsertQuery, parameters);

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

            params = [pilotID, currLanguage];

            await insertOneLanguageSqL(MySQL_connection, params, incrementQuerySQL, isLast);
        }


        // incrementQuerySQL();

    } catch (error) {
        console.error('Error:', error);
    }
}

/* SQL Functions End */

/* Main Start */


const mode = "i"; // Possible values are 'i' for insert and 'd' for delete 
var queryToComplete = 100; // Use this variable to limit how many instances you want to insert
var completedQueriesSQL = 0;
var completedQueriesMongo = 0;

// Mongoose_Connection.then(() => {
//     // Use the aggregation framework to get the distinct pilot IDs
//     return PilotModel.aggregate([
//         { $group: { _id: "$pilot_id" } },
//         { $count: "count" }
//     ]);
// })
//     .then(async () => {
//         const distinctPilotIds = await PilotModel.distinct('pilotID');
//         const numberOfDistinctPilots = distinctPilotIds.length;
//         console.log("Number of distinct pilot IDs:", numberOfDistinctPilots);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });


// Mongoose_Connection.then(() => {
//     // Use the aggregation framework to get the distinct pilot IDs
//     return LanguageModel.aggregate([
//         { $group: { _id: "$pilot_id" } },
//         { $count: "count" }
//     ]);
// })
//     .then(async () => {
//         const distinctPilotIds = await PilotModel.distinct('pilotID');
//         const numberOfDistinctPilots = distinctPilotIds.length;
//         console.log("Number of distinct pilot IDs:", numberOfDistinctPilots);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });

// return;


const pilotQuery = 'INSERT INTO Pilots SET ?';


if (mode == "d") {
    queryToComplete = 1;

    deleteSQL("UPDATE KnownLanguages SET pilot_id = ?", [null], MySQL_connection, incrementQuerySQL, false, "Pilot-Language");
    deleteSQL("DELETE FROM KnownLanguages WHERE pilot_id IS ? AND crew_id IS ?", [null, null], MySQL_connection, incrementQuerySQL, false, "Language");
    deleteSQL("DELETE FROM Pilots;", null, MySQL_connection, incrementQuerySQL, true, "Pilot");

    deleteMongo();
}
else if (mode == "i") {
    // MySQL Insert Queries

    var completedQueriesSQL = 0;


    const IDSet = new Set();
    while (IDSet.size < queryToComplete) {
        const flightID = h.generateID("pilot");
        IDSet.add(flightID);
    }

    var IDArr = Array.from(IDSet);

    for (var i = 0; i < queryToComplete; i++) {

        var pilotID = IDArr[i];
        var parametersDict = h.generatePilotData(pilotID);
        var languageData = h.generateLanguageData(parametersDict["nationality"]);


        insertPilotSQL(pilotQuery, MySQL_connection, parametersDict);
        insertAllLanguagesSQL(languageData, pilotID);


        let pilotInstance = new PilotClass(pilotID, parametersDict["name"], parametersDict["age"], parametersDict["gender"], parametersDict["sen_level"], parametersDict["veh_rest"], parametersDict["nationality"], parametersDict["max_range"], parametersDict["email"]);

        insertPilotMongo(pilotInstance);
        insertAllLanguagesMongo(languageData, pilotID);




    }

}


/* 

CREATE TABLE Personels(
    personel_id     VARCHAR(7)  NOT NULL,
    name            VARCHAR(20) NOT NULL,
    age             INT         NOT NULL,
    gender          VARCHAR(1)  NOT NULL,
    nationality     VARCHAR(20) NOT NULL,
    veh_rest    INT NOT NULL,
    email           VARCHAR(100) NOT NULL,
    PRIMARY KEY (personel_id)
);

CREATE TABLE Pilots(
    personel_id     VARCHAR(7)  NOT NULL,
    sen_level       VARCHAR(1)  NOT NULL,
    max_range       INT         NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE CabinCrew(
    personel_id     VARCHAR(7)  NOT NULL,
    att_type        VARCHAR(1)  NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE KnownLanguages(
    personel_id     VARCHAR(7)  NOT NULL,
    language        VARCHAR(20)  NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (personel_id, language)
    );


pilot max range / sen level ayrı yerlerde
known languages ayrı tabloda
*/
