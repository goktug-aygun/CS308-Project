
class Plane {
  constructor(
    planeID,
    planeType,
    crewLimit,
    passengerLimit,
    seniorityRestriction
  ) {
    this.planeID = planeID;
    this.planeType = planeType;
    this.crewLimit = crewLimit;
    this.passengerLimit = passengerLimit;
    this.seatCapacity = crewLimit + passengerLimit;
    this.seniorityRestriction = seniorityRestriction;
  }

  displayInfo() {
    console.log(`Plane ID: ${this.planeID}`);
    console.log(`Plane Type: ${this.planeType}`);
    console.log(`Passenger Limit: ${this.passengerLimit}`);
    console.log(`Crew Limit: ${this.crewLimit}`);
    console.log(`seatCapacity: ${this.seatCapacity}`);
    console.log(`Plane Seniority Level: ${this.seniorityRestriction}`);
  }
}

module.export(Plane);