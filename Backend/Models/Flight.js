const mongoose = require('mongoose');
// MongoDB connection
const uri = "mongodb+srv://cs308:cs308Test@flightrosterdb.sm2ovjq.mongodb.net/cs308";
mongoose.connect(uri);

class FlightClass{
    constructor(flightNumber,destination,source,duration,distance,date_time,plane_id,shared_flight_company_id,shared_flight_company_name)
    {
        this.flightNumber=flightNumber;
        this.destination=destination;
        this.source=source;
        this.duration=duration;
        this.distance=distance;
        this.date_time=date_time;
        this.plane_id=plane_id;
        this.shared_flight_company_id=shared_flight_company_id; 
        this.shared_flight_company_name=shared_flight_company_name;
    }
}

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    destination: String,
    source: String,
    duration: Number,
    distance: Number,
    date_time: String,
    plane_id: String,
    shared_flight_company_id: String,
    shared_flight_company_name: String
}, {
    versionKey: false
});

const flightTable = mongoose.model('Flights', flightSchema);

async function insertFlight(flightInstance) {
    flightTable.create({
        flightNumber: flightInstance.flightNumber,
        destination: flightInstance.destination,
        source: flightInstance.source,
        duration: flightInstance.duration,
        distance: flightInstance.distance,
        date_time: flightInstance.date_time,
        plane_id: flightInstance.plane_id,
        shared_flight_company_id: flightInstance.shared_flight_company_id,
        shared_flight_company_name: flightInstance.shared_flight_company_name,
    });
}

const flightAttendantsSchema = new mongoose.Schema({
    flightNumber: String,
    crew: [String],
    pilots: [String]
}, {
    versionKey: false
});

const flightAttendantsTable = mongoose.model('FlightCrew', flightAttendantsSchema);

async function assignToFlight(flight_id,crewArr,pilotsArr) {
    flightAttendantsTable.create({
        flightNumber: flight_id,
        crew: crewArr,
        pilots: pilotsArr,
    });
}

module.exports = {FlightClass,insertFlight,mongoose,assignToFlight};