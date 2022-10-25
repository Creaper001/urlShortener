import { Request, Response } from "express";
import createUser from "../services/createUser";
import getUsers from "../services/getUsers";

export default {
  async create(request: Request, response: Response) {
    const { code, name, site, email, password } = request.body;
    const user = createUser(code, name, site, email, password);

    return response.status(201).json(user);
  },
  async list(request: Request, response: Response) {
    const users = getUsers();
    return response.status(200).json(users);
  },
};
