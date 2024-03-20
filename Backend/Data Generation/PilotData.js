
const faker = require("faker");
const h = require('../helper_functions');
const { MySQL_connection, Mongoose_Connection, mongoose } = require("../database-connection");
// const { MySQL_connection } = require("../database-connection");
const { PilotClass, LanguageClass, insertPilot, insertLanguage, pilotTable, languageTable } = require("../Models/Pilot");

var mode = "insert"; // Possible values are 'insert' and 'delete' 
var numberOfInstances = 1; // Use this variable to limit how many instances you want to insert

async function insertData() {
    try {
        if (mode == "delete") {
            // Delete records from MySQL
            await Promise.all([
                MySQL_connection.query("DELETE FROM KnownLanguages;"),
                MySQL_connection.query("DELETE FROM Pilots;"),
                languageTable.deleteMany({}),
                pilotTable.deleteMany({})
            ]);
            console.log('All records deleted successfully');
        } else if (mode == "insert") {
            // MySQL Insert Queries
            const pilotQuery = 'INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email) VALUES (?,?,?,?,?,?,?,?,?)';
            const languageQuery = 'INSERT INTO KnownLanguages (pilot_id, language) VALUES (?,?)';

            for (var i = 0; i < numberOfInstances; i++) {
                // Generate data
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
                const english_main = ["English", "Australian", "Canadian", "Irish", "Indian", "American"];
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
                await MySQL_connection.query(pilotQuery, parameters);
                console.log('Pilot added successfully');

                // Add languages spoken to MySQL Database
                await Promise.all(parameters.map(param => MySQL_connection.query(languageQuery, param)));
                console.log('Languages added successfully');

                // Add Pilot Instance to MongoDB
                const pilotToAdd = new PilotClass(pilotID, name, age, gender, sen_level, veh_rest, nationality, maxRange, email);
                // await insertPilot(pilotToAdd);

                // Add languages spoken to MongoDB
                // await Promise.all(languagesSpoken.map(language => insertLanguage(new LanguageClass(pilotID, null, language))));
            }
            console.log('All records inserted successfully');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close connections
        await Promise.all([console.error(),
            MySQL_connection.end((error) => {
                if (error) {
                    console.error('Error closing MySQL connection:', error);
                } else {
                    console.log('MySQL connection closed');
                }
            }),
            mongoose.connection.close()
                .then(() => {
                    console.log('MongoDB connection closed');
                })
                .catch((error) => {
                    console.error('Error closing MongoDB connection:', error);
                })
        ]);
        // console.log('Connections terminated');
    }
}

insertData();
