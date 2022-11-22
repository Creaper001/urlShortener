import { Auth } from "./Auth";

export class Api {
  static host = "https://www.urlm.ga";
  static auth = new Auth();

  static async get(url) {
    const token = this.auth.get();
    const full = `${this.host}${url}`;
    const response = await fetch(full, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  static async post(url, data) {
    const token = this.auth.get();
    const full = `${this.host}${url}`;
    const response = await fetch(full, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  static async delete(url) {
    const token = this.auth.get();
    const full = `${this.host}${url}`;
    return await fetch(full, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
