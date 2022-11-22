import "dotenv/config";
import { MySQL } from "./MySQL";
import tables from "./tables.json";

const mysql = MySQL.get();

const queries = Object.keys(tables).map((table) => {
  const fields = Object.keys(tables[table]);
  const values = fields.map((field) => {
    return `${field} ${tables[table][field].join(" ")}`;
  });

  const exists = "if not exists";
  return mysql.query(`CREATE TABLE ${exists} ${table} (${values.join(",")})`);
});

Promise.all(queries).then(() => {
  process.exit(0);
});
