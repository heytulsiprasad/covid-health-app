const request = require("request");

const tracker = (place, callback) => {
    const base_url = "https://coronavirus-tracker-api.herokuapp.com/";
    const latest = base_url + "/v2/latest";
    const total = base_url + "/v2/locations";

    request({ url: total, json: true }, (error, response) => {
        try {
            const locations = response.body.locations; // array of locations
            const placeData = locations.find(location => {
                // location is an object
                if (location.country.toLowerCase() === place.toLowerCase()) {
                    return location;
                } else if (
                    location.province.toLowerCase() === place.toLowerCase()
                ) {
                    return location;
                } else {
                    return undefined;
                }
            });

            if (placeData === undefined) {
                callback("Unable to find location!", undefined);
            } else {
                callback(undefined, placeData);
            }
        } catch (error) {
            console.log("Unable to connect to COVID API");
        }
    });
};

// tracker("italy", (error, data) => {
//     console.log(error);
//     console.log(data);
// });

module.exports = tracker;
