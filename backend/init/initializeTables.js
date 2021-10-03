const { getClient } = require("../database");
const log = require("log-to-file");

const query = `CREATE SEQUENCE IF NOT EXISTS city_id_seq START 1;
CREATE TABLE IF NOT EXISTS public.city
(
  id integer NOT NULL DEFAULT nextval('city_id_seq'::regclass),
  city_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
  created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT city_pkey PRIMARY KEY (id)
)`;

(async () => {
  await createTable();
  console.log("\n");
})();

async function createTable() {
  const client = getClient();
  client.connect();

  await client
    .query(query)
    .then(res => {
      console.log("City table created if not exists");
    })
    .catch(err => {
      log(
        new Date() + "Error creating table city if it doesn't exist",
        "logs/errorLogs.txt"
      );
      console.log("Error creating table city if it doesn't exist", err);
    })
    .finally(() => {
      client.end();
    });
}
