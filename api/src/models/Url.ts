import { MySQL } from "../database/MySQL";

interface Data {
  path: string;
  userHashtag: string;
}

export class Url {
  private id: number;
  private name: string;
  private path: string;
  private userHashtag: string;

  private static $ = MySQL.get();

  constructor(data: Data) {
    this.id = Math.floor(100000 + Math.random() * 900000);
    this.path = data.path;
    this.userHashtag = data.userHashtag;
  }

  get() {
    return {
      id: this.id,
      path: this.path,
      userHashtag: this.userHashtag,
    };
  }

  async save() {
    const values = Object.values(this.get());
    await Url.$.query("INSERT INTO urls VALUES (?)", [values]);
  }

  static async all(userHashtag: string) {
    const sql = "SELECT * FROM urls WHERE userHashtag = ?";
    const values = [userHashtag];
    return await this.$.query(sql, values);
  }

  static async get(userHashtag: string, id: number | string) {
    const sql = "SELECT * FROM urls WHERE userHashtag = ? AND id = ?";
    const values = [userHashtag, id];
    const urls = (await this.$.query(sql, values)) as Data[];

    return new Url(urls[0]);
  }

  static async remove(userHashtag: string, id: number | string) {
    const sql = "DELETE FROM urls WHERE userHashtag = ? AND id = ?";
    const values = [userHashtag, id];
    await this.$.query(sql, values);
  }
}
