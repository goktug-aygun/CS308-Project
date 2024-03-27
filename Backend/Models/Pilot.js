const mongoose = require('mongoose');

class PilotClass {

    constructor(id, name, age, gender, sen_level, veh_rest, nationality, maxRange, email, knownLanguages, flights) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.sen_level = sen_level;
        this.veh_rest = veh_rest;
        this.nationality = nationality;
        this.maxRange = maxRange;
        this.email = email;
        this.knownLanguages = knownLanguages; // Array (will be used in Mongo)
        this.flights = flights; // Array (will be used in Mongo)
    }

    displayPilotInfo() {
        console.log(`Pilot ID: ${this.id}`);
        console.log(`Pilot Name: ${this.name}`);
        console.log(`Pilot Gender: ${this.gender}`);
        console.log(`Pilot Nationality: ${this.nationality}`);
        console.log(`Pilot Seniority Level: ${this.sen_level}`);
        console.log(`Pilot Vehicle Restriction: ${this.veh_rest}`);
        console.log(`Pilot Max Range: ${this.maxRange}`);
        console.log(`Pilot Email: ${this.email}\n`);
    }

}


const pilotSchema = new mongoose.Schema({
    pilotID: String,
    name: String,
    age: Number,
    gender: String,
    nationality: String,
    sen_level: String,
    veh_rest: Number,
    maxRange: Number,
    email: String,
    knownLanguages : [String],
    flights : [String]
}, {
    versionKey: false
});


const PilotModel = mongoose.model('pilots', pilotSchema);

const insertPilot = (pilotInstance) => {
    return PilotModel.create({
        pilotID: pilotInstance.id,
        name: pilotInstance.name,
        age: pilotInstance.age,
        gender: pilotInstance.gender,
        nationality: pilotInstance.nationality,
        sen_level: pilotInstance.sen_level,
        veh_rest: pilotInstance.veh_rest,
        maxRange: pilotInstance.maxRange,
        email: pilotInstance.email,
        knownLanguages : pilotInstance.knownLanguages,
        flights : pilotInstance.flights
    });
};




module.exports = { PilotClass, insertPilot, PilotModel};