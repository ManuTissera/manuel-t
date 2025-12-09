import pkg from "pg";

const { Client } = pkg;

// Si Heroku define DATABASE_URL, usamos eso.
// Si no, usamos tu config local.
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:3752Post@localhost:5432/nutri-pro";

// En Heroku necesitamos SSL, en local no.
const ssl = process.env.DATABASE_URL ? { rejectUnauthorized: false } : false;

const connection = new Client({
  connectionString,
  ssl,
});

connection.connect((err) => {
  if (err) {
    console.error("Fail connection PostgreSQL", err);
  } else {
    console.log("Connection BBDD PostgreSQL");
  }
});

export default connection;
