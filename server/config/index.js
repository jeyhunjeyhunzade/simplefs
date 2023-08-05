require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  database: "postgres",
  user: "postgres",
  password: process.env.DBPASSWORD,
  port: 5432,
  host: "localhost",
});

module.exports = pool;
