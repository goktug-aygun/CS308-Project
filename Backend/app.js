var mode = "goktug";

const {generateID} = require('./helper_functions');
const express = require('express');
const Pilot = require('./Pilot');
const passenger = require('./InfoPassenger');
// const attendant = require("./flightAttendant");

if (mode == "goktug") {

    var pilotInfo = new Pilot.InfoClass("Goktug Aygun", 21, "Male", "Turkish", ["Turkish", "English", "German"]);
    var pilotObj = new Pilot.PilotClass(1, pilotInfo, "Airbus A380", 3200, "Junior");

    var passengerInfo = new passenger("Arkadasim Timur", 1, "Male", "Gevur", null, 1, 2);
    passengerInfo.displayPassengerInfo();

    pilotObj.displayPilotInfo();

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.json(passengerInfo);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// App Damla 
else if (mode == "damla") {
    
    const app = express();
    const port = 3001;

    const vehicleTypes = [
        'Airbus A320',
        'Boeing 737',
        'Embraer E190',
        'Bombardier CRJ700',
        'Airbus A380',
        'Boeing 787 Dreamliner',
        'Boeing 747',
        'Airbus A350'
    ];

    const numVehicleTypes = Math.floor(Math.random() * 4) + 1;
    const vehicleTypesList = [];
    while (vehicleTypesList.length < numVehicleTypes) {
        const randomIndex = Math.floor(Math.random() * vehicleTypes.length);
        const randomVehicleType = vehicleTypes[randomIndex];

        // selected vehicle type is not already in the list
        if (!vehicleTypesList.includes(randomVehicleType)) {
            vehicleTypesList.push(randomVehicleType);
        }
    }

    const languages = ['English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic'];

    // Function to generate random list of unique items from an array
    function generateRandomList(array, count) {
        const result = [];
        while (result.length < count) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const randomItem = array[randomIndex];

            if (!result.includes(randomItem)) {
                result.push(randomItem);
            }
        }
        return result;
    }

    const numKnownLanguages = Math.floor(Math.random() * 4) + 1;
    const knownLanguages = generateRandomList(languages, numKnownLanguages);

    const menu = ['Pasta', 'Chicken', 'Meatballs', 'Vegetarian Menu', 'Steak', 'ASPAVA'];
    const numMenuTypes = 3;
    const menuList = generateRandomList(menu, numMenuTypes);

    console.log(menuList)

    var crewInfo1 = new attendant.infoCrew("Mark Hellburg", 28, "Male", "American", knownLanguages);
    var attendantInfo1 = new attendant.flightAttendant("A001", crewInfo1, "regular", "junior attendant", vehicleTypesList, menuList);

    var crewInfo2 = new attendant.infoCrew("Efe Baller", 25, "Male", "Turkish", knownLanguages);
    var attendantInfo2 = new attendant.flightAttendant("Ch002", crewInfo2, "chef", "chef", vehicleTypesList, menuList);

    var crewInfo3 = new attendant.infoCrew("Karen White", 38, "Female", "French", knownLanguages);
    var attendantInfo3 = new attendant.flightAttendant("C003", crewInfo3, "chief", "senior attendant", vehicleTypesList, menuList);

    var crewInfo4 = new attendant.infoCrew("Mike Smith", 32, "Male", "British", knownLanguages);
    var attendantInfo4 = new attendant.flightAttendant("A008", crewInfo4, "regular", "senior attendant", vehicleTypesList, menuList);

    const allAttendantInfo = [attendantInfo1, attendantInfo2, attendantInfo3, attendantInfo4];

    const flightInfo1 = attendantInfo1.displayCrewInfo();

    app.get('/', (req, res) => {
        res.json(attendantInfo1);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
