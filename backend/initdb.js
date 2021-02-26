const { Client, Pool } = require("pg");

async function init() {
  let pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "password",
    port: 5432,
  });

  // Initialize DB
  await pool
    .query("DROP DATABASE COUPON_ISSUER;")
    .then(() => console.log("dropped db coupon_issuer..."))
    .catch((e) => {
      console.log("failed dropping database coupon_issuer... ", e);
    })
    .finally(() => {
      console.log("Start creating database coupon_issuer...");
      return pool.query("CREATE DATABASE COUPON_ISSUER;");
    })
    .then(() => console.log("Creation complete"))
    .catch((e) => console.log("Error while creating db... ", e))
    .finally(() => {
      pool.end();
      pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "password",
        database: "coupon_issuer",
        port: 5432,
      });
      return pool.query(`DROP TABLE coupon;`);
    })
    .then(() => console.log("Dropping coupon table complete"))
    .catch((e) => console.log("Error while dropping coupon table...", e))
    .finally(() => {
      pool.end();
      pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "password",
        database: "coupon_issuer",
        port: 5432,
      });
      return pool.query(`DROP TABLE coupon_type;`);
    })
    .then(() => console.log("Dropping coupon_type table complete"))
    .catch((e) => console.log("Error while dropping coupon_type table...", e))
    .finally(() => {
      pool.end();
      pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "password",
        database: "coupon_issuer",
        port: 5432,
      });
      console.log("Now creating the table...");
      return pool.query(`CREATE EXTENSION "uuid-ossp";`);
    })
    .then(() => console.log("Created extension"))
    .catch((e) => console.log("Error while creating extension..."))
    .finally(() =>
      pool.query(
        `CREATE TABLE coupon_type ( id BIGSERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW());`
      )
    )
    .then(() => console.log("Creating table coupon_type complete"))
    .catch((e) => console.log("Error while creating coupon_type table...", e))
    .finally(() => {
      pool.end();
      pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "password",
        database: "coupon_issuer",
        port: 5432,
      });
      return pool.query(
        "CREATE INDEX idx_coupon_type_name ON coupon_type(name)"
      );
    })
    .then(() => console.log("creating index complete"))
    .catch((e) => console.log("Error while creating index"))
    .finally(() => {
      pool.end();
      pool = new Pool({
        user: "postgres",
        host: "localhost",
        password: "password",
        database: "coupon_issuer",
        port: 5432,
      });
      console.log("Now create coupon...");
      return pool.query(
        "CREATE TABLE coupon (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), coupon_type_id BIGINT REFERENCES coupon_type(id), CREATED_AT TIMESTAMP NOT NULL DEFAULT NOW())"
      );
    })
    .then(() => console.log("Creating coupon table complete"))
    .catch((e) => console.log("Error while creating coupon table...", e))
    .finally(() => {
      console.log("Now start inserting data...");
      return pool.query(
        `INSERT INTO coupon_type(name) VALUES('20 percent for all');
        INSERT INTO coupon_type(name) VALUES('30 percent for fresh foods');`,
        (err, res) => {
          console.log(err, res);
          pool.end();
        }
      );
    })
    .then(() => console.log("Creating coupon_type table complete"))
    .catch((e) => console.log("Error while creating coupon_type table...", e));
}

init();
