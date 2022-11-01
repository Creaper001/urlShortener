import { Request, Response } from "express";
import getUrl from "../services/getUrl";
import createUrl from "../services/createUrl";

export default {
  async redirect(request: Request, response: Response) {
    const { userID, urlID } = request.params;
    const data = getUrl(userID, urlID);

    if (!data) return response.sendStatus(404);
    return response.redirect(301, data.url);
  },
  async create(request: Request, response: Response) {
    const { url } = request.body;
    const data = createUrl(url);

    return response.status(201).json(data);
  },
};
