const { Client } = require("pg");
const tunnel = require("tunnel-ssh");
const { readFileSync } = require("fs");

function Query(query, db) {
  return new Promise((resolve, reject) => {
    const tunnelPort = 33000 + Math.floor(Math.random() * 1000);

    tunnel(
      {
        host: process.env.SSH_HOST,
        username: process.env.SSH_USERNAME,
        privateKey: readFileSync(process.env.SSH_PRIVATE_KEY),
        port: 22,
        dstHost: db.host,
        dstPort: 5432,
        localPort: tunnelPort,
      },
      async (err) => {
        if (err) throw err;
        console.log("Tunnel connected");

        const client = new Client({
          connectionString: `postgres://${db.user}:${db.password}@127.0.0.1:${tunnelPort}/${db.database}`,
        });

        try {
          await client.connect();
          const res = await client.query(query);
          await client.end();

          resolve(res.rows);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "template1",
};

Query("SELECT * FROM pg_catalog.pg_tables", db)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
