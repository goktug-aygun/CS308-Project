//class Location -->flightSource,flightDestination: country, city, airport name and airport code (in AAA format)
//class Vehicle -->vehicleType  number of seats and seating plan
//flightInfo --> date up to minutes,duration,distance, company array
class Flight{
    constructor(flightNumber,flightInfo,Source,Destination,vehicleType,sharedInfo)
    {
        this.flightNumber = flightNumber;
        this.flightInfo = flightInfo;
        this.Source = Source;
        this.Destination = Destination;
        this.vehicleType = vehicleType;
        this.sharedInfo = sharedInfo;
    }

    displayInfo(){
        console.log(`Flight Number: ${this.flightNumber}`);
        console.log(`Source: ${this.Source.cityName}`);
        console.log(`Destination: ${this.Destination.cityName}`);
        console.log(`Duration: ${this.duration}`);
        console.log(`Distance: ${this.distance}`);
        console.log(`Date: ${this.date}`);
        console.log(`Time: ${this.time}`);
        console.log(`Vehicle Type: ${this.VehicleType.planeID}`);
        console.log(`Shared Company ID: ${this.sharedCompanyID}`);
    }
}