const router = require("express").Router();
var services = require("../services/services");

router.get("/", (req, res) => {
  res.send("Weather Api is working");
});

router.get("/get-weather-data", (req, res) => {
  services.getWeatherData(req, res);
});

router.post("/create-new-city", (req, res) => {
  services.addCity(req, res);
});

router.get("/get-city-list", (req, res) => {
  services.getListOfCities(req, res);
});

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
