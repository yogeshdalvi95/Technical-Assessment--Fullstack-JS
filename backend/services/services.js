const log = require("log-to-file");
const { getClient } = require("../database");
var axios = require("axios");

module.exports = {
  getWeatherData: async (req, res) => {
    let filters = req.query;
    var config = {
      method: "get",
      url: process.env.WEATHER_API_URL,
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        ...filters,
        appid: process.env.OPEN_WEATHER_API_KEY,
        units: "metric"
      }
    };

    console.log(config);
    axios(config)
      .then(function (response) {
        console.log(response);
        res.status(200);
        res.send({
          response: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
        log(
          new Date() +
            " Error getting weather data from api " +
            process.env.WEATHER_API_URL +
            " with filters " +
            filters +
            " ",
          "logs/errorLogs.txt"
        );
        res.status(500);
        res.send({
          status: 500,
          message: "Error getting weather data",
          error: error
        });
      });
  },

  addCity: async (req, res) => {
    let body = req.body;
    const { city_name } = body;
    if (city_name) {
      let queryToCheckIfCityExist = `Select * from city where city_name = ${city_name}`;
      let queryToInsert = `INSERT INTO 
      city(
        city_name
        )
      VALUES (
        '${city_name}'
      )`;

      const clientToInsert = getClient();
      clientToInsert.connect();
      await clientToInsert
        .query(queryToInsert)
        .then(results => {
          res.send(200);
        })
        .catch(e => {
          log(new Date() + " Error adding city " + e, "logs/errorLogs.txt");
        })
        .finally(() => {
          clientToInsert.end();
        });
    } else {
      res.status(500);
      res.send({
        status: 500,
        message: "City not provided"
      });
    }
  },

  getListOfCities: async (req, res) => {
    let query = `Select * from city`;
    const client = getClient();
    client.connect();
    await client
      .query(query)
      .then(results => {
        res.send(results.rows);
      })
      .catch(e => {
        log(new Date() + " Error querying city " + e, "logs/errorLogs.txt");
      })
      .finally(() => {
        client.end();
      });
  }
};
