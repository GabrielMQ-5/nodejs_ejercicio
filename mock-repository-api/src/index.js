const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { routes: repositoryRoutes } = require("./repository/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/repository", repositoryRoutes);

module.exports = app;
