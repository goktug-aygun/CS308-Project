function generateID(type)
{
    if (type == "crew")
    {
        var ret = "";
        ret += Math.floor(Math.random() * (99999 - 10000) + 10000).toString()

        for(var i = 0; i < 3; i++)
        {
            ret += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65))
        }
        return ret;
    }
    else if (type == "passenger")
    {
        var ret = "";
        

        for(var i = 0; i < 3; i++)
        {
            ret += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65))
        }
        ret += Math.floor(Math.random() * (999 - 100) + 100).toString()
        for(var i = 0; i < 2; i++)
        {
            ret += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65))
        }
        return ret;
    }
    else if (type == "airport")
    {
        var ret = "";
        for(var i = 0; i < 3; i++)
        {
            ret += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
        }
        return ret;
    }
    else if (type == "flight")
    {
        var ret = "";

        for(var i = 0; i < 2; i++)
        {
            ret += String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65))
        }

        ret += Math.floor(Math.random() * (9999 - 1000) + 1000).toString()

        return ret;
    }
    else if(type == "plane")
    {
        var ret = "SK";

        ret += Math.floor(Math.random() * (9999 - 1000) + 1000).toString()

        return ret;
    }
}

module.exports = {generateID};

// Below are blueprints for SQL table creation

// CREATE TABLE pilots
// {
//     id VARCHAR(8) NOT NULL,
//     name VARCHAR(8) NOT NULL,
//     age VARCHAR(8) NOT NULL,
//     gender Boolean NOT NULL,
//     nationality VARCHAR(20) NOT NULL,
//     // known languages will be given in another table
//     sen_level VARCHAR(8) NOT NULL,
//     veh_rest VARCHAR(20) NOT NULL,
//     max_range integer NOT NULL
//     PRIMARY KEY (id)
// }

// CREATE TABLE pilotLanguages
// {
//     id VARCHAR(8) NOT NULL,
//     language VARCHAR(20) NOTNULL
//     FOREIGN KEY id REFERENCES pilots(id)
//     PRIMARY KEY (id, language)
// }

// CREATE TABLE crewLanguages
// {
//     id VARCHAR(8) NOT NULL,
//     language VARCHAR(20) NOTNULL
//     FOREIGN KEY id REFERENCES crewMembers(id)
//     PRIMARY KEY (id, language)
// }
