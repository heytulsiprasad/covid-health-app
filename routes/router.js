const express = require("express");
const router = new express.Router();
const request = require("request");

const geocode = require("../src/utils/geocode");
const place = require("../src/utils/place");
const tracker = require("../src/utils/tracker");

const defaultImg =
    "https://images.unsplash.com/photo-1580483733209-558da93c143c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

const defaultData = callback => {
    const URL = "https://coronavirus-tracker-api.herokuapp.com/v2/latest";

    request({ url: URL, json: true }, (error, response) => {
        try {
            const info = response.body.latest;
            // console.log(info);

            callback(undefined, info);
        } catch (error) {
            console.log("Unable to connect to COVID API");
        }
    });
};

router.get("", (req, res) => {
    if (req.query.address) {
        tracker(req.query.address, (error, covidData) => {
            if (error) {
                const latestInfo = defaultData((error, data) => {
                    res.render("index", {
                        dataDefault: data,
                        image: defaultImg
                    });
                });
            } else {
                // console.log(covidData);

                place(req.query.address, (error, image) => {
                    if (error) {
                        res.render("index", {
                            image: defaultImg
                        });
                    } else {
                        res.render("index", {
                            dataDefault: null,
                            data: covidData,
                            image: image
                        });
                    }
                });
            }
        });
    } else {
        res.render("index", {
            dataDefault: null,
            data: null,
            image: defaultImg
        });
    }
});

module.exports = router;
