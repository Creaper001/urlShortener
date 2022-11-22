import { MySQL } from "../database/MySQL";

interface Data {
  hashtag: string;
  name: string;
  email: string;
  password: string;
  website: string | null;
}

export class User {
  private hashtag: string;
  private name: string;
  private email: string;
  private password: string;
  private website: string | null;

  private static $ = MySQL.get();

  constructor(data: Data) {
    this.hashtag = data.hashtag;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.website = data.website;
  }

  get() {
    return {
      hashtag: this.hashtag,
      name: this.name,
      email: this.email,
      password: this.password,
      website: this.website,
    };
  }

  async save() {
    const values = Object.values(this.get());
    await User.$.query("INSERT INTO users VALUES (?)", [values]);
  }

  static async get(email: string) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const values = [email];
    const users = (await this.$.query(sql, values)) as Data[];
    return new User(users[0]);
  }
}
