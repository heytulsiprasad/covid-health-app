console.log("Graph file loaded successfully");


fetch("/covidLatest").then(response => {
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
