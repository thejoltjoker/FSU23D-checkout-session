import { StatusCodes } from "http-status-codes";
import { ServerError } from "../models/ServerError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  let statusCode;

  if (err instanceof ServerError) {
    statusCode = err.statusCode;
  } else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message || "Something went wrong",
  });
};
