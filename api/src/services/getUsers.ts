import { FakeDB } from "../database/fakeDB";

export default () => {
  const fakeDB = FakeDB.get();
  return fakeDB.getUsers();
};
