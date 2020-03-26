const request = require("request");

const trackerDefault = callback => {
    const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

    request({ url: url, json: true }, (error, response) => {
        try {
            const latestinfo = response.body.latest;
            callback(undefined, latestinfo);
        } catch (error) {
            callback("Unable to connect to COVID API", undefined);
        }
    });
};

// trackerDefault((error, data) => {
//     console.log(data);
// });

module.exports = trackerDefault;
