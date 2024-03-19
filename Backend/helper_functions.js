const connection = require('./sql-connection');
function getRandomInt(min, max) {
    // Returns a random integer
    // min is included, max is not, [min, max)
    return Math.floor(Math.random() * (max - min) + min);
}

function generateID(type)
{
    if (type == "crew") // Length 7
    {
        var ret = "C-";
        ret += getRandomInt(10000, 100000).toString()

        return ret;
    }
    else if (type == "pilot") // Length 7
    {
        var ret = "P-";
        ret += getRandomInt(10000, 100000).toString()

        return ret;
    }
    else if (type == "passenger") // Length 7
    {
        var ret = "T-";
        
        ret += getRandomInt(10000, 100000).toString()
        
        return ret;
    }
    else if (type == "flight") // Length 6
    {
        var ret = "SU";

        ret += getRandomInt(1000,10000).toString()

        return ret;
    }
    else if(type == "plane") // Length 7
    {
        var ret = "SK-";

        ret += getRandomInt(1000, 10000).toString()

        return ret;
    }
}

function getSeatNumber(max) // Returns a random seat number
{
    letter = ["A", "B", "C", "D", "E", "F"].at(getRandomInt(0,6));
    num = getRandomInt(1,max).toString()
    num = (num.length == 1) ? "0" + num : num

    return `${num}-${letter}`
}
//flight generation helper functions// 

// Function to get a random source location
function getRandomSourceLocation(callback) {
    connection.query('SELECT airport_code FROM Locations ORDER BY RAND() LIMIT 1', (err, results) => {
    if (err) {
        callback(err);
        return;
    }
    callback(null, results[0].airport_code);
    });
}

// Function to get a random destination location
function getRandomDestinationLocation(sourceLocation, callback) {
    connection.query(`SELECT airport_code FROM Locations WHERE airport_code != ? ORDER BY RAND() LIMIT 1`, [sourceLocation], (err, results) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, results[0].airport_code);
    });
}

//Function to get random shared flight company name
function getRandomFlightCompanyName() {
    const airlines = [
        ["AA", "American Airlines"],
        ["UA", "United Airlines"],
        ["DL", "Delta Air Lines"],
        ["BA", "British Airways"],
        ["AF", "Air France"],
        ["LH", "Lufthansa"],
        ["EK", "Emirates Airlines"],
        ["PC", "Pegasus Airlines"]
        ["QR", "Qatar Airways"],
        ["TK", "Turkish Airlines"],
        ["SQ", "Singapore Airlines"],
        ["CX", "Cathay Pacific"],
        ["QF", "Qantas Airways"],
        ["EY", "Etihad Airways"],
        ["JL", "Japan Airlines"],
        ["NH", "All Nippon Airways"],
        ["AI", "Air India"],
        ["AS", "Alaska Airlines"],
        ["KL", "KLM Royal Dutch Airlines"],
    ];
        
    // 15% chance
    if (Math.random() > 0.15) {return [null,null];}
  
    // Return a random company name from the list
    const randomIndex = Math.floor(Math.random() * airlines.length);
    return airlines[randomIndex];
}

//Function to get random shared flight company name
function calculateDistance(coordinates) {
    lat1=coordinates[0], lon1=coordinates[1], lat2=coordinates[2], lon2=coordinates[3];
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

//Function to calculate duration based on distance between locations
function calculateDuration(distance) {
    let duration = 0
    if (distance<500){
        duration = distance/450;
    }
    else if (distance<1000){
        duration=distance/500;
    }
    else if (distance<5000){
        duration=distance/600;
    }
    else{
        duration=distance/650;
    }

    return duration*(0.9 + Math.random() * 0.2);
}

module.exports = {generateID, getRandomInt, getSeatNumber,getRandomSourceLocation,getRandomDestinationLocation,getRandomFlightCompanyName,calculateDistance,calculateDuration};