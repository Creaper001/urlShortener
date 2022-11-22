import mysql, { Connection } from "mysql2";

export class MySQL {
  private readonly MYSQL_HOST = process.env.MYSQL_HOST;
  private readonly MYSQL_USER = process.env.MYSQL_USER;
  private readonly MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
  private readonly MYSQL_DATABASE = process.env.MYSQL_DATABASE;

  private _connection: Connection;
  private static _instance: MySQL;

  private constructor() {
    this.set();
  }

  private set() {
    this._connection = mysql.createConnection({
      host: this.MYSQL_HOST,
      user: this.MYSQL_USER,
      password: this.MYSQL_PASSWORD,
      database: this.MYSQL_DATABASE,
    });
  }

  public static get() {
    if (!this._instance) this._instance = new MySQL();
    return this._instance;
  }

  public query(sql: string, values: any | any[] = []) {
    return new Promise((resolve, reject) => {
      this._connection.query(sql, values, (error, data) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  }
}
