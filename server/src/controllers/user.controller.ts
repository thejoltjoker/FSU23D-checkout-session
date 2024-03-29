import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import {
  create as createUser,
  get as getUser,
  remove as removeUser,
  upsert as updateUser,
} from "../services/user.service";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to retrieve user", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const create = async (
  req: Request<{}, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(
      new User(req.body.userId, req.body.favorites)
    );

    res.status(201).json(user);
  } catch (err) {
    console.error(`Error while creating user`, err);
    next(err);
  }
};

export const update = async (
  req: Request<{ userId: string }, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUser(req.params.userId, { ...req.body });
    if (!user) {
      return res.status(404).json({ message: "Couldn't find user" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(`Error while updating user`, err);
    res.status(500).send({ message: "Something went wrong" });
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
    res.status(500).send({ message: "Something went wrong" });
  }
};
