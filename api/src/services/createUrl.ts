import { FakeDB } from "../database/fakeDB";
import generateID from "./generateID";

export default (url: string) => {
  const fakeDB = FakeDB.get();

  const id = generateID();
  const userID = generateID();

  return fakeDB.add({
    userID: userID,
    id: id,
    url: url,
  });
};
