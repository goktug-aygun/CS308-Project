const connection = require('./sql-connection.js');
const { cityAirports, countryCities } = require('./fakerLocationData.js');

class FlightLocation {
    constructor(country, city, airport, airportCode) {
        this.country = country;
        this.city = city;
        this.airport = airport;
        this.airportCode = airportCode;
    }

    toString() {
        return `${this.country}, ${this.city}, ${this.airport} (${this.airportCode})`;
    }
}

// Function to randomly choose an item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// choose a country
const randomCountry = getRandomItem(Object.keys(countryCities));
const citiesInCountry = countryCities[randomCountry];

// choose a city
const randomCity = getRandomItem(citiesInCountry);
const airportsInCity = cityAirports[randomCity];

// choose a airport
const randomAirport = getRandomItem(airportsInCity);

// Create a FlightLocation object
const flightLocation = new FlightLocation(
    randomCountry,
    randomCity,
    randomAirport.name,
    randomAirport.code
);

console.log("Trial Faker Run: ");
console.log(flightLocation.toString());


// Insert 10 elements into the Locations table
for (let i = 0; i < 10; i++) {
    // choose a country
    const randomCountry = getRandomItem(Object.keys(countryCities));
    const citiesInCountry = countryCities[randomCountry];

    // choose a city
    const randomCity = getRandomItem(citiesInCountry);
    const airportsInCity = cityAirports[randomCity];

    // choose a airport
    const randomAirport = getRandomItem(airportsInCity);

    // Create a FlightLocation object
    const flightLocation = new FlightLocation(
        randomCountry,
        randomCity,
        randomAirport.name,
        randomAirport.code
    );

    // Insert data into the Locations table
    const insertQuery = `INSERT INTO Locations (country_name, city_name, airport_name, airport_code) 
                         VALUES (?, ?, ?, ?)`;
    const values = [flightLocation.country, flightLocation.city, flightLocation.airport, flightLocation.airportCode];
    
    connection.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        console.log(`Data ${i + 1} inserted successfully`,flightLocation.toString());
    });
}

// Close the connection
connection.end();