import mysql, { Connection } from "mysql2";

export class MySQL {
  private readonly DATABASE_URL = process.env.DATABASE_URL as string;

  private _connection: Connection;
  private static _instance: MySQL;

  private constructor() {
    this.set();
  }

  private set() {
    this._connection = mysql.createConnection(this.DATABASE_URL);
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
