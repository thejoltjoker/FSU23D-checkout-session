import { NextFunction, Request, Response } from "express";
import { get as getUser, upsert as upsertUser } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { User } from "../models/User";

interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const register = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const exisitingUser = await getUser(email);

    if (exisitingUser) {
      return res.status(StatusCodes.CONFLICT).json("User exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await upsertUser(new User(email, passwordHash));
    return res.status(StatusCodes.CREATED).json("User created");
  } catch (error) {
    console.error("Failed to retrieve user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const existingUser = await getUser(email);

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("Invalid email or password");
    }

    req.session!.user = existingUser;

    res.status(StatusCodes.OK).json(existingUser.email);
  } catch (error) {
    console.error("Failed to login user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong");
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session = null;

    res.status(StatusCodes.OK).json("User logged out");
  } catch (error) {
    console.error("Failed to logout user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong");
  }
};

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session?.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json("User not logged in");
    }

    res.status(StatusCodes.OK).json(req.session?.user.email);
  } catch (error) {
    console.error("Failed to authorize user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong");
  }
};
