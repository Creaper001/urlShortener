import { Request, Response } from "express";
import getUrl from "../services/getUrl";

export default () => ({
  redirect(request: Request, response: Response) {
    const { userID, urlID } = request.params;

    const url = getUrl(userID, urlID);

    return response.status(301).redirect(301, url);
  },
});
