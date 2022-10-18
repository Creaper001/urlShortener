import { FakeDB } from "../database/fakeDB";

export default (userID: string, urlID: string) => {
  const fakeDB = FakeDB.get();
  return fakeDB.getUrl(userID, urlID);
};
