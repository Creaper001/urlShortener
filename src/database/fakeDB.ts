interface Url {
  userID: string;
  id: string;
  url: string;
}

export class FakeDB {
  private static fakeDB = new FakeDB();
  public urls = [] as Url[];

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
}
