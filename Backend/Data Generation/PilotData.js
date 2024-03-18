const faker = require("faker");
const mysql = require('mysql');
const mongoose = require('mongoose');
const h = require('../helper_functions')
const { PilotClass, LanguageClass, insertPilot, insertLanguage } = require("../Models/Pilot");



var mode = "insert"; // Possible values are 'insert' and 'delete' 
var numberOfInstances = 4; // Use this variable to limit how many instances you want to insert


// MongoDB connection
const uri = "mongodb+srv://cs308:cs308Test@test-db.1sxjsvf.mongodb.net/?retryWrites=true&w=majority&appName=test-db";
mongoose.connect(uri);

// MySQL Connection
const MySQL_connection = mysql.createConnection({
    host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'cs308project',
    database: 'CS308_MAIN_SQL_DATABASE'
});

MySQL_connection.connect();


if (mode == "delete") {
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

}
else if (mode == "insert") {
    // MySQL Insert Queries
    const pilotQuery = 'INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email) VALUES (?,?,?,?,?,?,?,?,?)';
    const languageQuery = 'INSERT INTO KnownLanguages (pilot_id, crew_id, language) VALUES (?,?,?)';

    for (var i = 0; i < numberOfInstances; i++) {
        // Const Possible Values
        const nationalities = ["English", "German", "French", "Turkish", "Spanish", "Indian", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "American", "Mexican", "Japanese", "Ukrainian", "Mongolian", "Australian", "Austrian", "Belgian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Swiss", "Portuguese", "Polish", "Irish", "Greek", "Canadian", "Brazilian", "Bulgarian", "Israeli", "Thai", "Vietnamese", "Norwegian", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Luxembourgish", "Icelandic"];
        const languages = ["English", "German", "French", "Turkish", "Spanish", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Portuguese", "Polish", "Irish", "Greek", "Thai", "Vietnamese", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Icelandic", "Arabic", "Hindi", "Korean", "Swahili", "Bengali", "Mandarin"];

        // Generate Random Data
        var pilotID = h.generateID("pilot");
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
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

        parameters = [pilotID, name, age, gender, nationality, sen_level, veh_rest, maxRange, email];

        // Add Pilot to MySQL Database
        MySQL_connection.query(pilotQuery, parameters, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }
            console.log('Rows affected:', results.affectedRows);
        });

        // Add languages spoken to MySQL Database
        parameters = []
        for (var j = 0; j < languagesSpoken.length; j++) { parameters.push([pilotID, null, languagesSpoken[j]]); }

        for (var k = 0; k < parameters.length; k++) {
            MySQL_connection.query(languageQuery, parameters[k], (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return;
                }
                console.log('Rows affected:', results.affectedRows);
            });
        }

        // Add Pilot Instance to MongoDB
        const pilotToAdd = new PilotClass(pilotID, name, age, gender, sen_level, veh_rest, nationality, maxRange, email);
        insertPilot(pilotToAdd);
        // MongoDB Atlas Pilot Insert Statement
        // Defined in Pilot.js

        // Add languages spoken to MongoDB
        for (var m = 0; m < parameters.length; m++) {
            insertLanguage(pilotID, null, languagesSpoken[m]);
            // MongoDB Atlas Language Insert Statement
            // Defined in Pilot.js
        }

    }
}
