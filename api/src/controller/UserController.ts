import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export default {
  async create(request: Request, response: Response) {
    const { hashtag, name, email, password, website } = request.body;
    const user = new User({
      hashtag,
      name,
      email,
      password,
      website,
    });
    await user.save();
    return response.status(200).json({
      user: user.get(),
    });
  },

  async index(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = await User.get(email);
    if (user.get().password === password) {
      const token = jwt.sign({ hashtag: user.get().hashtag }, "shhhhh");
      return response.status(200).json({
        user: user.get(),
        token: token,
      });
    }
    return response.sendStatus(400);
  },
};
