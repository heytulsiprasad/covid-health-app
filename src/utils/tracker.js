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
                request({ url: latest, json: true }, (error, response) => {
                    try {
                        const latestinfo = response.body.latest;
                        callback("No recorded data yet!", latestinfo);
                    } catch (error) {
                        console.log("Unable to connect to COVID API");
                        callback("No recorded data yet!", undefined);
                    }
                });
            } else {
                callback(undefined, placeData);
            }
        } catch (error) {
            console.log("Unable to connect to COVID API");
        }
    });
};

// tracker("india", (error, data) => {
//     console.log(error);
//     console.log(data);
// });

module.exports = tracker;
