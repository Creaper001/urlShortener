import { FakeDB } from "../database/fakeDB";
import generateID from "./generateID";

export default (
  code: string,
  name: string,
  site: string,
  email: string,
  password: string
) => {
  const fakeDB = FakeDB.get();
  const id = generateID();

  return fakeDB.addUser({
    id: id,
    code: code,
    name: name,
    site: site,
    email: email,
    password: password,
  });
};
