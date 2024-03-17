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

console.log(flightLocation.toString());
