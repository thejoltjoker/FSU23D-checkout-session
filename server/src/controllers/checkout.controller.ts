import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).json("OK");
  } catch (error) {
    console.error("Failed to retrieve user", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
