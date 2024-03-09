class InfoCrew {
    
    constructor(name, age, gender, nationality, knownLanguages) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.nationality = nationality;
      this.knownLanguages = knownLanguages;     
    }
  
    displayInfo(){
      console.log(`Name: ${this.name}`);
      console.log(`Age: ${this.age}`);
      console.log(`Gender: ${this.gender}`);
      console.log(`Nationality: ${this.nationality}`);
      console.log("\nKnown Language(s):");
      for(var i = 0; i < this.knownLanguages.length; i++)
      {
          console.log(`${i+1}) ${this.knownLanguages[i]}`)
      }
      console.log("");
    }
    
  }
  
module.exports = InfoCrew;