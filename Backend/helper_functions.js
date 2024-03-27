const faker = require("faker");

function getRandomInt(min, max) {
    // Returns a random integer
    // min is included, max is not, [min, max)
    return Math.floor(Math.random() * (max - min) + min);
}

function generateID(type) {
    if (type == "crew") // Length 7
    {
        let ret = "C-";
        ret += getRandomInt(10000, 100000).toString();

        return ret;
    }
    else if (type == "pilot") // Length 7
    {
        let ret = "P-";
        ret += getRandomInt(10000, 100000).toString();

        return ret;
    }
    else if (type == "passenger") // Length 7
    {
        let ret = "T-";

        ret += getRandomInt(10000, 100000).toString();

        return ret;
    }
    else if (type == "flight") // Length 6
    {
        let ret = "SU";

        ret += getRandomInt(1000, 10000).toString();

        return ret;
    }
    else if (type == "plane") // Length 7
    {
        let ret = "SK-";

        ret += getRandomInt(1000, 10000).toString();

        return ret;
    }
    else if (type == "food") // Length 6
    {
        let ret = "F-";

        ret += getRandomInt(1000, 10000).toString();

        return ret;
    }
}



function getSeatNumber(max) // Returns a random seat number
{
    letter = ["A", "B", "C", "D", "E", "F"].at(getRandomInt(0, 6));
    num = getRandomInt(1, max).toString()
    num = (num.length == 1) ? "0" + num : num

    return `${num}-${letter}`
}

const nationalities = ["English", "German", "French", "Turkish", "Spanish", "Indian", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "American", "Mexican", "Japanese", "Ukrainian", "Mongolian", "Australian", "Austrian", "Belgian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Swiss", "Portuguese", "Polish", "Irish", "Greek", "Canadian", "Brazilian", "Bulgarian", "Israeli", "Thai", "Vietnamese", "Norwegian", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Luxembourgish", "Icelandic"];
const languages = ["English", "German", "French", "Turkish", "Spanish", "Chinese", "Japanese", "Czech", "Hungarian", "Russian", "Italian", "Swedish", "Finnish", "Norwegian", "Danish", "Dutch", "Portuguese", "Polish", "Irish", "Greek", "Thai", "Vietnamese", "Slovak", "Estonian", "Lithuanian", "Latvian", "Maltese", "Icelandic", "Arabic", "Hindi", "Korean", "Swahili", "Bengali", "Mandarin"];


function generatePilotData(id) {
    const firstName = faker.name.firstName();
    // var lastName = "deneme";
    const lastName = faker.name.lastName();
    const name = firstName + " " + lastName;
    const age = getRandomInt(30, 50);
    const gender = ["M", "F"].at(getRandomInt(0, 2));
    const sen_level = ["S", "J", "T"].at(getRandomInt(0, 3));
    const veh_rest = [1, 2, 3, 4].at(getRandomInt(0, 4));
    const nationality = nationalities.at(getRandomInt(0, nationalities.length));
    const maxRange = (sen_level == "S") ? (getRandomInt(20, 31) * 1000) : (sen_level == "J") ? (getRandomInt(15, 21) * 1000) : (getRandomInt(5, 15) * 1000); 
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@sabanciuniv.edu`;

    const parametersDict = {
        pilot_id: id,
        name: name,
        age: age,
        gender: gender,
        nationality: nationality,
        sen_level: sen_level,
        veh_rest: veh_rest,
        max_range: maxRange,
        email: email,
    }

    return parametersDict;
}



function generateLanguageData(nationality) {
    const english_main = ["English", "Australian", "Canadian", "Irish", "Indian", "American"]
    const english_main_bool = english_main.includes(nationality);
    const languagesSpoken = (english_main_bool) ? ["English"] : ["English", nationality];
    const randomCount = (english_main_bool) ? getRandomInt(1, 4) : getRandomInt(0, 3);


    for (let j = 0; j < randomCount; j++) {
        do {
            var randomLanguage = languages.at(getRandomInt(0, languages.length));
        }
        while (languagesSpoken.includes(randomLanguage));
        languagesSpoken.push(randomLanguage);
    }

    return languagesSpoken;
}



module.exports = { generateID, getRandomInt, getSeatNumber, generatePilotData, generateLanguageData};