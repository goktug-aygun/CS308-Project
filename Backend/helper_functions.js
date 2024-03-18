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

module.exports = {generateID, getRandomInt, getSeatNumber};