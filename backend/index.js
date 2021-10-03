const express = require("express");
const cors = require("cors");

require("dotenv").config();
const routes = require("./routes");
var bodyParser = require("body-parser");

/** Initialize app */
const app = express();

/** Get Port */
const port = process.env.BACKENDPORT || 8000;

if (process.env.NODE_ENV !== "test") {
  require("./init/initializeTables.js");
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(cors());
app.listen(port, () => {
  console.log(`Weather API listening on port ${port}!`);
});
