export class Auth {
  static $() {
    if (!this.auth) this.auth = new Auth();
    return this.auth;
  }

  isAuth() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  get() {
    return localStorage.getItem("token");
  }

  set(token) {
    localStorage.setItem("token", token);
  }

  clear() {
    localStorage.removeItem("token");
  }
}
