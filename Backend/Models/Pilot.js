const mongoose = require('mongoose');

class PilotClass {

    constructor(id, name, age, gender, sen_level, veh_rest, nationality, maxRange, email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.sen_level = sen_level;
        this.veh_rest = veh_rest;
        this.nationality = nationality;
        this.maxRange = maxRange;
        this.email = email;
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

class LanguageClass
{
    constructor (_pilotID, _crewID, _language)
    {
        this.pilotID = _pilotID;
        this.crewID = _crewID;
        this.language = _language;
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
    email: String
}, {
    versionKey: false
});

const LanguageSchema = new mongoose.Schema({
    pilotID: String,
    crewID: String,
    language: String
}, {
    versionKey: false
});

const pilotTable = mongoose.model('Pilots', pilotSchema);
const languageTable = mongoose.model('Languages', LanguageSchema);

async function insertPilot(pilotInstance) {
    pilotTable.create({
        pilotID: pilotInstance.id,
        name: pilotInstance.name,
        age: pilotInstance.age,
        gender: pilotInstance.gender,
        nationality: pilotInstance.nationality,
        sen_level: pilotInstance.sen_level,
        veh_rest: pilotInstance.veh_rest,
        maxRange: pilotInstance.maxRange,
        email: pilotInstance.email
    });
}

async function insertLanguage(instance) {
    LanguageTable.create({
        pilotID: instance.pilotID,
        crewID: instance.crewID,
        language: instance.language
    });
}


module.exports = { PilotClass, LanguageClass, insertPilot, insertLanguage, pilotTable, languageTable};