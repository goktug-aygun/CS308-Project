const InfoClass = require('./InfoCrew')

class PilotClass {
    
    constructor(id, info, vehRestriction, maxRange, senLevel) {
        this.id = id;
        this.info = info;
        this.vehRestriction = vehRestriction;
        this.maxRange = maxRange;
        this.senLevel = senLevel;
        
    }

    displayPilotInfo(){
        console.log(`Pilot ID: ${this.id}`);
        this.info.displayInfo();
        console.log(`Vehicle Restriction: ${this.vehRestriction}`);
        console.log(`Max Range: ${this.maxRange}`);
        console.log(`Seniority: ${this.senLevel}`);
    }

  }

module.exports = {PilotClass, InfoClass};
  