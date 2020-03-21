console.log("Graph file loaded successfully");

// let config = {
//     modeBarButtonsToRemove: [
//         "toImage",
//         "sendDataToCloud",
//         "editInChartStudio",
//         "zoom2d",
//         "pan2d",
//         "select2d",
//         "lasso2d",
//         "zoomIn2d",
//         "zoomOut2d",
//         "autoScale2d",
//         "resetScale2d",
//         "hoverClosestCartesian",
//         "hoverCompareCartesian",
//         "zoom3d",
//         "pan3d",
//         "orbitRotation",
//         "tableRotation",
//         "resetCameraDefault3d",
//         "resetCameraLastSave3d",
//         "hoverClosest3d",
//         "zoomInGeo",
//         "zoomOutGeo",
//         "resetGeo",
//         "hoverClosestGeo",
//         "hoverClosestGl2d",
//         "hoverClosestPie",
//         "resetViewSankey",
//         "toggleHover",
//         "resetViews",
//         "toggleSpikelines",
//         "resetViewMapbox",
//         "zoomInMapbox",
//         "zoomOutMapbox"
//     ],
//     displaylogo: false
// };

fetch("http://localhost:5000/covidLatest").then(response => {
    response
        .json()
        .then(res => {
            // console.log(res);

            // BAR GRAPH => DEFAULT
            let barData = [
                {
                    x: ["confirmed", "recovered", "deaths"],
                    y: [res.confirmed, res.deaths, res.recovered],
                    type: "bar"
                }
            ];

            Plotly.newPlot("bar-default", barData, {}, config);

            // PIE CHART => DEFAULT
            let pieData = [
                {
                    values: [res.confirmed, res.deaths, res.recovered],
                    labels: ["confirmed", "recovered", "deaths"],
                    type: "pie"
                }
            ];

            Plotly.newPlot("pie-default", pieData, {}, config);
        })
        .catch(error => {
            console.log("An unexpected error occured");
        });
});
