import { NextFunction, Request, Response } from "express";

import { get as getUser } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUser(req.params.userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json("User not found");
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("Failed to retrieve user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
