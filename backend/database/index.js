const { Client } = require("pg");
var Pool = require("pg-pool");

const clientConnectionData = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.SSL == "false" ? false : true
};

const poolConnectionData = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.SSL == "false" ? false : true
};

module.exports = {
  getClient: () => {
    return new Client(clientConnectionData);
  },

  getPool: () => {
    return new Pool(poolConnectionData);
  }
};
