import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json("User not logged in");
  }
  next();
};

export default authCheck;
