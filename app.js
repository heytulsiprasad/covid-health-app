const express = require("express");
require("dotenv").config();
var path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

const route = require("./routes/router");
app.use(route);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
