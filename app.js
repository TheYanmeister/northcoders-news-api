const express = require("express");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handle500,
  psqlError,
  nothingFound
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(psqlError);

app.use(nothingFound);

app.use(handle500);

module.exports = app;
