const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "password",
  database: "coupon_issuer",
  port: 5432,
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  queryAsync: (text, params) => pool.query(text, params),
};
