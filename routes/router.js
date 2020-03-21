const express = require("express");
const moment = require("moment");
const router = new express.Router();

const place = require("../src/utils/place");
const tracker = require("../src/utils/tracker");
const trackerDef = require("../src/utils/trackerDefault");

const image2 =
    "https://images.unsplash.com/photo-1580483733209-558da93c143c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
const image1 =
    "https://images.unsplash.com/photo-1583072248822-f909497b6ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/covid", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You gotta enter an address to search 🤷‍♂️"
        });
    }

    tracker(req.query.search, (error, data) => {
        if (error) {
            return res.send({
                image1: image1,
                image2: image2,
                totalConfirmed: data.confirmed,
                totalDeaths: data.deaths,
                totalRecovered: data.recovered
            });
        }

        let date = moment(data.last_updated);

        place(req.query.search, (error, img) => {
            if (error) {
                return res.send({
                    image1: image1,
                    image2: image2,
                    place: data.province,
                    country: data.country,
                    updated: date.fromNow(),
                    confirmed: data.latest.confirmed,
                    deaths: data.latest.deaths,
                    recovered: data.latest.recovered
                });
            }

            res.send({
                image1: img[0],
                image2: img[1],
                place: data.province,
                country: data.country,
                updated: date.fromNow(),
                confirmed: data.latest.confirmed,
                deaths: data.latest.deaths,
                recovered: data.latest.recovered
            });
        });
    });
});

router.get("/covidLatest", (req, res) => {
    trackerDef((error, latestData) => {
        if (error) {
            return res.send({
                confirmed: 272166,
                deaths: 11299,
                recovered: 87256
            });
        }

        res.send({
            confirmed: latestData.confirmed,
            deaths: latestData.deaths,
            recovered: latestData.recovered
        });
    });
});

module.exports = router;
