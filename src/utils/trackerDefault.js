const request = require("request");

const trackerDefault = callback => {
    const base_url = "https://coronavirus-tracker-api.herokuapp.com/";
    const latest = base_url + "/v2/latest";

    request({ url: latest, json: true }, (error, response) => {
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
