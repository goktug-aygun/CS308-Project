class InfoPassenger {
    
  constructor(name, age, gender, nationality, seattype, parentId1, parentId2) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.nationality = nationality;
    this.seattype = age < 2 ? null : seattype;
    this.parentInfo = age < 2 ? [parentId1, parentId2] : null;
  }

  displayPassengerInfo(){
      console.log(`Name: ${this.name}`);
      console.log(`Age: ${this.age}`);
      console.log(`Gender: ${this.gender}`);
      console.log(`Nationality: ${this.nationality}`);
      if(this.seattype != null){
        console.log(`Seat Type: ${this.seattype}`);
      }
      for(var i = 0; i < this.parentInfo.length; i++){
        if(this.parentInfo[i] != null){console.log(`Parent ID #${i+1}) ${this.parentInfo[i]}`);}
      }
      console.log("\n");
      
  }
  
}

module.exports = InfoPassenger;