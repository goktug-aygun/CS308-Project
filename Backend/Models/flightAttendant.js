const infoCrew = require("./infoCrew");

class FlightAttendant {
    constructor(id, info, type, level, veh_restriction, menu) {
        this.id = id;
        this.info = info;
        this.type = type;
        this.level = level;
        this.veh_restriction = veh_restriction;
        this.menu = menu; // Assign the menu property
    }

    displayCrewInfo() {
        console.log(`ID of flight attendant is: ${this.id}`);
        this.info.displayInfo();
        console.log(`Type of flight attendant is: ${this.type}`); // Fixed the typo here
        console.log(`Level of flight attendant is: ${this.level}`);
        console.log(`Veh_restriction of flight attendant is: ${this.veh_restriction}`);
        if (this.type === "chef") { // Use this.type to access the type property
            console.log(`The menu chef has prepared for the flight is ${this.menu}`);
        }
    }
}

module.exports = {
    infoCrew: infoCrew,
    flightAttendant: FlightAttendant 
};
