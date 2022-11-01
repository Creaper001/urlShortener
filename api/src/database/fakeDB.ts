interface Url {
  userID: string;
  id: string;
  url: string;
}
interface User {
  id: string;
  code: string;
  name: string;
  site: string;
  email: string;
  password: string;
}

export class FakeDB {
  private static fakeDB = new FakeDB();
  public urls = [] as Url[];
  public users = [] as User[];

  static get() {
    return this.fakeDB;
  }
  add(url: Url) {
    this.urls.push(url);
    return url;
  }
  getUrl(userID: string, urlID: string) {
    return this.urls.find((url) => {
      return url.id === urlID && url.userID === userID;
    });
  }
  addUser(user: User) {
    this.users.push(user);
    return user;
  }
  getUsers() {
    return this.users;
  }
}
