const request = require("request-promise");

let putOptions1 = {
	method: "PUT",
    uri: "http://192.168.x.x/api/<my id>/lights/1/state",
    body: {
        "hue": 47827,
        "xy": [
            0.139,
            0.081
        ],
    },
    json: true // Automatically parses the JSON string in the response
};

let putOptions2 = {
	method: "PUT",
    uri: "http://192.168.x.x/api/<my id>/lights/2/state",
    body: {
        "hue": 46014,
        "xy": [
            0.154,
            0.0806
        ],
    },
    json: true // Automatically parses the JSON string in the response
};

module.exports.run = async (bot, message, args) => {
    request(putOptions1).then(() => {
        try {
            console.log("Light 1 is blue");
        }
        catch(err) {
            // statements
            console.error(err);
        }
    })
    request(putOptions2).then(() => {
        try {
            console.log("Light 2 is blue");
        }
        catch(err) {
            // statements
            console.error(err);
        }
    })
}

module.exports.help = {
	//what to type in discord to invoke the command
	name: "blue"
}


