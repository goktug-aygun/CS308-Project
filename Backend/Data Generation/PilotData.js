const mysql = require('mysql');
const { MySQL_connection, Mongoose_Connection, mongoose } = require("../Database Connection/sql-connection");

const h = require('../helper_functions')
const { PilotClass, LanguageClass, insertPilot, insertLanguage, PilotModel, LanguageModel } = require("../Models/Pilot");


const executeQuery = (connection, query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
};

function incrementQuerySQL() {
    ++completedQueriesSQL;
    // console.log(`Completed Queries ${completedQueriesSQL}`);
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

function incrementQueryMongo() {
    completedQueriesMongo++;
    if (completedQueriesMongo === queryToComplete) {
        console.log("All queries are completed. Closing MongoDB connection.");
        mongoose.connection.close();
    }
}

async function insertPilotSQL(pilotInsertQuery, connection, parameters) {
    try {
        const { results, fields } = await executeQuery(connection, pilotInsertQuery, parameters);
        // console.log('Rows Affected:', results["affedtedRows"]);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function insertLanguageSQL(langSearchQuery, connection, parameters, callback, isLast) {
    try {
        const { results, fields } = await executeQuery(connection, langSearchQuery, parameters[1]);
        if (results.length == 0) // no available spot, create new row
        {
            const languageInsertQuery = 'INSERT INTO KnownLanguages (pilot_id, language) VALUES (?,?)';
            const { results, fields } = await executeQuery(connection, languageInsertQuery, parameters);
        }
        else // there are empty places, can swap values
        {
            const languageUpdateQuery = "UPDATE KnownLanguages SET pilot_id = ? where pilot_id IS NULL AND language = ? LIMIT 1;"
            const { results, fields } = await executeQuery(connection, languageUpdateQuery, parameters);
        }
        if (callback && isLast) {
            callback();
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function insertPilotMongo(pilotInstance, callback, isLast) {
    try {
        const { result } = await insertPilot(pilotInstance);
        // console.log("Inserted pilot instance to MongoDB");
        // console.log('Rows Affected:', results["affedtedRows"]);
        if (callback && isLast) {
            callback();
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function deleteSQL(deleteQuery, connection, callback, isLast, kind) {
    try {
        const { results, fields } = await executeQuery(connection, deleteQuery, null);
        console.log(`All records are deleted for ${kind} instances`);
        if (callback && isLast) {
            callback();
        }
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

async function deleteMongo() {
    try {
        const pilotDeleteResult = await PilotModel.deleteMany({});
        console.log("All Pilot instances are deleted.");

        LanguageModel.updateMany({}, { $set: { pilotID: null } })
            .then(result => {
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


var mode = "insert"; // Possible values are 'insert' and `delete' 
var queryToComplete = 15; // Use this variable to limit how many instances you want to insert
var completedQueriesSQL = 0;
var completedQueriesMongo = 0;



if (mode == "delete") {
    queryToComplete = 1;

    deleteSQL("DELETE FROM KnownLanguages;", MySQL_connection, incrementQuerySQL, false, "Language");
    deleteSQL("DELETE FROM Pilots;", MySQL_connection, incrementQuerySQL, true, "Pilot");

    deleteMongo();
}
else if (mode == "insert") {
    // MySQL Insert Queries
    const pilotQuery = 'INSERT INTO Pilots SET ?';
    const searchQuery = "SELECT * FROM KnownLanguages WHERE language = ? and pilot_id IS NULL";

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
        for (var k = 0; k < languageData.length; k++) {
            params = [pilotID, languageData[k]];
            insertLanguageSQL(searchQuery, MySQL_connection, params, incrementQuerySQL, k == languageData.length - 1)
        }

        completedQueriesMongo = 0;

        var pilotInstance = new PilotClass(pilotID, parametersDict["name"], parametersDict["age"], parametersDict["gender"], parametersDict["sen_level"], parametersDict["veh_rest"], parametersDict["nationality"], parametersDict["max_range"], parametersDict["email"]);

        insertPilotMongo(pilotInstance, incrementQueryMongo, true);
        // console.log(`Completed mongo queries ${completedQueriesMongo}`)



        // languageData.forEach((currLanguage) => {
        //     LanguageModel.find({ pilotID: null, language: currLanguage })
        //         .then(result => {
        //             if (result.length != 0) {
        //                 const row = result[0];
        //                 var id = row._id.toString();

        //                 LanguageModel.updateOne({ _id: id }, { $set: { pilotID: pilotID } })
        //                     .then(result => {
        //                         console.log('Update result:', result);
        //                     })
        //                     .catch(err => {
        //                         console.error('Error updating pilot:', err);
        //                     });
        //             }
        //             else {
        //                 insertLanguageMongo(new LanguageClass(pilotID, null, currLanguage));
        //             }
        //         })
        // });

        if (completedQueriesMongo == queryToComplete) {
            mongoose.connection.close();
            console.log("Mongoose connection closed");
        }
    }

    // MongoDB Insert Operation








}



