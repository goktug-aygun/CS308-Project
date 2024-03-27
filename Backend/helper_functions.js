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
