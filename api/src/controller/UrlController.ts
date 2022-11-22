import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Url } from "../models/Url";

export default {
  async remove(request: Request, response: Response) {
    const auth = request.headers["authorization"];
    const { id } = request.params;

    if (!auth || !auth.startsWith("Bearer ")) {
      return response.sendStatus(400);
    }

    const token = auth.substring(7, auth.length);
    const payload = jwt.decode(token);

    if (!payload) {
      return response.sendStatus(400);
    }

    await Url.remove(payload["hashtag"], id);

    return response.sendStatus(200);
  },

  async create(request: Request, response: Response) {
    const auth = request.headers["authorization"];
    const { path } = request.body;

    if (!auth || !auth.startsWith("Bearer ")) {
      return response.sendStatus(400);
    }

    const token = auth.substring(7, auth.length);
    const payload = jwt.decode(token);

    if (!payload) {
      return response.sendStatus(400);
    }

    const url = new Url({
      path: path,
      userHashtag: payload["hashtag"],
    });
    await url.save();

    return response.status(200).json({
      url: url.get(),
    });
  },

  async list(request: Request, response: Response) {
    const auth = request.headers["authorization"];

    if (!auth || !auth.startsWith("Bearer ")) {
      return response.sendStatus(400);
    }

    const token = auth.substring(7, auth.length);
    const payload = jwt.decode(token);

    if (!payload) {
      return response.sendStatus(400);
    }

    const urls = await Url.all(payload["hashtag"]);

    return response.status(200).json({
      urls: urls,
    });
  },

  async redirect(request: Request, response: Response) {
    const { userHashtag, id } = request.params;

    const url = await Url.get(userHashtag, id);

    return response.redirect(301, url.get().path);
  },
};
