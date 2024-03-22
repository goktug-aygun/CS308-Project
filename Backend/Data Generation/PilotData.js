const faker = require("faker");
const mysql = require('mysql');
// const mongoose = require('mongoose');
const h = require('../helper_functions')
const { PilotClass, LanguageClass, insertPilot, insertLanguage } = require("../Models/Pilot");



var mode = "insert"; // Possible values are 'insert' and `delete' 
var queryToComplete = 10; // Use this variable to limit how many instances you want to insert
var completedQueries = 0;

// MongoDB connection
// const uri = "mongodb+srv://cs308:cs308Test@test-db.1sxjsvf.mongodb.net/?retryWrites=true&w=majority&appName=test-db";
// mongoose.connect(uri);

// MySQL Connection
const MySQL_connection = mysql.createConnection({
    host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'cs308project',
    database: 'CS308_MAIN_SQL_DATABASE'
});

MySQL_connection.connect();


if (mode == "delete") {
    queryToComplete = 1;
    // MySQL Delete Query
    var query = "DELETE FROM KnownLanguages;";
    MySQL_connection.query(query, (err, results) => {
        if (err) throw err;

        console.log(results);
    });


    query = "DELETE FROM Pilots;";
    MySQL_connection.query(query, (err, results) => {
        if (err) throw err;

        console.log(results);
    });
    completedQueries++;
}
else if (mode == "insert") {
    // MySQL Insert Queries
    const pilotQuery = 'INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email) VALUES (?,?,?,?,?,?,?,?,?)';
    const languageInsertQuery = 'INSERT INTO KnownLanguages (pilot_id, language) VALUES (?,?)';
    const languageUpdateQuery = "UPDATE KnownLanguages SET pilot_id = ? where pilot_id IS NULL AND language = ?;"
    var completedQueries = 0;
    for (var i = 0; i < queryToComplete; i++) {
        // Const Possible Values
        const nationalities = ["English", "German", "French", "Turkish", "Spanish", "Indian", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "American", "Mexican", "Japanese", "Ukrainian", "Mongolian", "Australian", "Austrian", "Belgian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Swiss", "Portuguese", "Polish", "Irish", "Greek", "Canadian", "Brazilian", "Bulgarian", "Israeli", "Thai", "Vietnamese", "Norwegian", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Luxembourgish", "Icelandic"];
        const languages = ["English", "German", "French", "Turkish", "Spanish", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Portuguese", "Polish", "Irish", "Greek", "Thai", "Vietnamese", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Icelandic", "Arabic", "Hindi", "Korean", "Swahili", "Bengali", "Mandarin"];

        // Generate Random Data
        var pilotID = h.generateID("pilot");
        // var pilotID = "P-00000";
        // var firstName = faker.name.firstName();
        var firstName = "deneme";
        var lastName = "deneme";
        // var lastName = faker.name.lastName();
        var name = firstName + " " + lastName;
        var age = h.getRandomInt(30, 50);
        var gender = ["M", "F"].at(h.getRandomInt(0, 2));
        var sen_level = ["S", "J", "T"].at(h.getRandomInt(0, 3));
        var veh_rest = [1, 2, 3, 4].at(h.getRandomInt(0, 4));
        var nationality = nationalities.at(h.getRandomInt(0, nationalities.length));
        var maxRange = h.getRandomInt(500, 5001);
        var email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@sabanciuniv.edu`;
        const english_main = ["English", "Australian", "Canadian", "Irish", "Indian", "American"]
        var english_main_bool = english_main.includes(nationality);
        var languagesSpoken = (english_main_bool) ? ["English"] : ["English", nationality];
        var randomCount = (english_main_bool) ? h.getRandomInt(1, 4) : h.getRandomInt(0, 3);

        for (var j = 0; j < randomCount; j++) {
            do {
                var randomLanguage = languages.at(h.getRandomInt(0, languages.length));
            }
            while (languagesSpoken.includes(randomLanguage));
            languagesSpoken.push(randomLanguage);
        }

        // console.log(name)
        // console.log(pilotID)

        // continue;
        parameters = [pilotID, name, age, gender, nationality, sen_level, veh_rest, maxRange, email];

        // Add Pilot to MySQL Database
        MySQL_connection.query(pilotQuery, parameters, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }
            else {
                console.log(`Inserted pilot with pilot_id ${parameters[i]}`);
                for (var k = 0; k < languagesSpoken.length; k++) {
                    (function (k) {
                        MySQL_connection.query(languageInsertQuery, [pilotID, languagesSpoken[k]], (error, results, fields) => {
                            if (error) {
                                console.error('Error executing query:', error);
                                return;
                            }
                            console.log(`Inserted language ${languagesSpoken[k]} for pilot with pilot_id ${pilotID}`);
                        });
                    })(k);
                }
                completedQueries++;
                if (completedQueries == queryToComplete) {
                    // Close MySQL Connection
                    MySQL_connection.end((err) => {
                        if (err) {
                            console.error('Error closing database connection:', err.stack);
                            return;
                        }
                        else{console.log("MySQL Connection is closed.")}
                
                    });
                }
            }
        });

        // Add languages spoken to MySQL Database
        parameters = []
        for (var j = 0; j < languagesSpoken.length; j++) { parameters.push([pilotID, languagesSpoken[j]]); }



        // Add Pilot Instance to MongoDB
        // const pilotToAdd = new PilotClass(pilotID, name, age, gender, sen_level, veh_rest, nationality, maxRange, email);
        // insertPilot(pilotToAdd);
        // MongoDB Atlas Pilot Insert Statement
        // Defined in Pilot.js

        // Add languages spoken to MongoDB
        // for (var m = 0; m < parameters.length; m++) {
        //     insertLanguage(pilotID, null, languagesSpoken[m]);
        //     // MongoDB Atlas Language Insert Statement
        //     // Defined in Pilot.js
        // }

    }

    
}
console.log(`completedQueries: ${completedQueries}`);
console.log(`queryToComplete: ${queryToComplete}`);


