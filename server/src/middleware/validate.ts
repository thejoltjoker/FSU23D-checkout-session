import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "zod";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.parse(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
    next();
  };
};
