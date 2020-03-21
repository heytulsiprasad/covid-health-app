console.log("Client side javascript is working");

let config = {
    modeBarButtonsToRemove: [
        "toImage",
        "sendDataToCloud",
        "editInChartStudio",
        "zoom2d",
        "pan2d",
        "select2d",
        "lasso2d",
        "zoomIn2d",
        "zoomOut2d",
        "autoScale2d",
        "resetScale2d",
        "hoverClosestCartesian",
        "hoverCompareCartesian",
        "zoom3d",
        "pan3d",
        "orbitRotation",
        "tableRotation",
        "resetCameraDefault3d",
        "resetCameraLastSave3d",
        "hoverClosest3d",
        "zoomInGeo",
        "zoomOutGeo",
        "resetGeo",
        "hoverClosestGeo",
        "hoverClosestGl2d",
        "hoverClosestPie",
        "resetViewSankey",
        "toggleHover",
        "resetViews",
        "toggleSpikelines",
        "resetViewMapbox",
        "zoomInMapbox",
        "zoomOutMapbox"
    ],
    displaylogo: false
};

// When User is At Root Route => results sections
fetch("http://localhost:5000/covid?search=india").then(response => {
    response.json().then(res => {
        // console.log(res);

        const bg1 = document.querySelector(".main__default--bg1");
        bg1.style.backgroundImage = `url(${res.image1})`;

        const bg2 = document.querySelector(".footer--bg2");
        bg2.style.backgroundImage = `url(${res.image2})`;

        const title = document.querySelector(".result__title");
        const timer = document.querySelector(".result__timer");
        if (res.place || res.country) {
            title.textContent = res.place || res.country;
            timer.textContent = res.updated;
        } else {
            title.textContent = "India";
            timer.textContent = "Last update yesterday";
        }

        // BAR GRAPH => RESULT
        let barData = [
            {
                x: ["confirmed", "recovered", "deaths"],
                y: [res.confirmed, res.recovered, res.deaths],
                type: "bar",
                hoverinfo: "none"
            }
        ];

        Plotly.newPlot("bar-result", barData, {}, config);

        // PIE CHART => RESULT

        var pieData = [
            {
                values: [res.confirmed, res.recovered, res.deaths],
                labels: ["confirmed", "recovered", "deaths"],
                type: "pie"
            }
        ];

        var layout = {
            height: 334,
            width: 486
        };

        Plotly.newPlot("pie-result", pieData, layout, config);
    });
});

const form = document.querySelector("#search-form");

form.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(e);

    const input = e.target.elements.search.value;
    // console.log(input);

    fetch("http://localhost:5000/covid?search=" + encodeURIComponent(input))
        .then(response => {
            response.json().then(res => {
                console.log(res);
                // do something with res data in object
                const bg1 = document.querySelector(".main__default--bg1");
                bg1.style.backgroundImage = `url(${res.image1})`;

                const bg2 = document.querySelector(".footer--bg2");
                bg2.style.backgroundImage = `url(${res.image2})`;

                const title = document.querySelector(".result__title");
                const timer = document.querySelector(".result__timer");
                if (res.place || res.country) {
                    title.textContent = res.place || res.country;
                    timer.textContent = res.updated;
                } else {
                    title.textContent = "Latest Updates";
                    timer.textContent = "Last update yesterday";
                }

                // BAR GRAPH => RESULT
                let barData = [
                    {
                        x: ["confirmed", "recovered", "deaths"],
                        y: [res.confirmed, res.recovered, res.deaths],
                        type: "bar",
                        hoverinfo: "none"
                    }
                ];

                Plotly.newPlot("bar-result", barData, {}, config);

                // PIE CHART => RESULT

                var pieData = [
                    {
                        values: [res.confirmed, res.recovered, res.deaths],
                        labels: ["confirmed", "recovered", "deaths"],
                        type: "pie"
                    }
                ];

                var layout = {
                    height: 334,
                    width: 486
                };

                Plotly.newPlot("pie-result", pieData, layout, config);
            });
        })
        .catch(error => {
            console.log("No address provided!");
        });
});

const panicForm = document.querySelector("#panic-form");

panicForm.addEventListener("submit", e => {
    e.preventDefault();

    const box = document.querySelector("#result");

    const cough = e.target.elements.cough.checked;
    const fever = e.target.elements.fever.checked;
    const tired = e.target.elements.tired.checked;
    const breathe = e.target.elements.breathe.checked;
    const days = e.target.elements.since.value;

    if (days <= 4) {
        if (cough || fever) {
            box.textContent =
                "These are very mild symptomps which may even be just cold. So have patience and faith, there's nothing to worry. ✌";
        } else if (tired) {
            box.textContent =
                "It's been hell of a pandemic, maybe you just need to rest a little bit more. We're here for you ❤";
        } else if (breathe) {
            box.textContent =
                "This is a very rare symptom and its just been a while. Stay calm for a few days and come back again. 😉";
        } else {
            box.textContent =
                "Sorry, we gave our best, but still its hard saying your situation. Prefer to contact our specialists below. 😕";
        }
    } else if (days > 4 && days <= 10) {
        box.textContent =
            "You shall prefer by a doctor or any medical practinioner immediately. 🏥😷🔜";
    } else {
        box.textContent =
            "Um...somethings not right with us. Maybe you could give us call. 📞";
    }
});
