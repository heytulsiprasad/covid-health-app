require("dotenv").config({ path: "../../.env" });

const toJson = require("unsplash-js").toJson;
const Unsplash = require("unsplash-js").default;
const fetch = require("node-fetch");
global.fetch = fetch;

const unsplash = new Unsplash({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secret: process.env.UNSPLASH_SECRET
});

const getSinglePhoto = (keyword, callback) => {
    unsplash.search
        .photos(keyword, 1, 1, { orientation: "portrait" })
        .then(toJson)
        .then(photosData => {
            photosData.results.forEach(item => {
                const img = item.urls.regular;
                callback(undefined, img);
            });
        })
        .catch(error => callback(error, undefined));
};

// getSinglePhoto("India", (error, data) => {
//     console.log(data);
// });

module.exports = getSinglePhoto;
