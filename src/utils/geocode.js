require("dotenv").config({ path: "../../.env" });

const request = require("request");

// We are now doing REVERSE GEOCODING

const geocode = (longitude, latitude, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}`;

    request({ url: url, json: true }, (error, response) => {
        // console.log(response.body);

        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to get exact location!", undefined);
        } else {
            callback(undefined, {
                place: response.body.features[0].place_name
            });
        }
    });
};

// geocode(78, 21, (error, data) => {
//     console.log(data);
// });

module.exports = geocode;
