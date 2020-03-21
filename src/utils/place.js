require("dotenv").config({ path: "../../.env" });

const toJson = require("unsplash-js").toJson;
const Unsplash = require("unsplash-js").default;
const fetch = require("node-fetch");
global.fetch = fetch;

const unsplash = new Unsplash({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secret: process.env.UNSPLASH_SECRET
});

const getDoublePhoto = (keyword, callback) => {
    let pics = [];

    unsplash.search
        .photos(keyword, 1, 2, { orientation: "landscape" })
        .then(toJson)
        .then(photosData => {
            photosData.results.forEach(item => {
                const img = item.urls.regular;
                pics.push(img);
            });
            callback(undefined, pics);
        })
        .catch(error => callback(error, undefined));
};

// getDoublePhoto("India", (error, data) => {
//     console.log(data);
// });

module.exports = getDoublePhoto;
