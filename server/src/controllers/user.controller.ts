import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import {
  get as getUser,
  remove as removeUser,
  upsert as upsertUser,
} from "../services/user.service";
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await upsertUser(new User(req.body.email, req.body.email));
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json("Couldn't find user");
    }
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    console.error(`Error while updating user`, err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

export const remove = async (
  req: Request<{ userId: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    await removeUser(req.params.userId);
    res.status(204).json({});
  } catch (err) {
    console.error(`Error while deleting user`, err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
