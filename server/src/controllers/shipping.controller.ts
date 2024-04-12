import { NextFunction, Request, Response } from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { servicePointsFromPostalCode } from "../services/postnord.service";
import { tryCatch } from "../utils/tryCatch";
import * as core from "express-serve-static-core";
import { ServerError } from "../models/ServerError";

interface GetServicePointsRequest extends Request {
  params: {
    postalCode?: string;
  };
}

export const getServicePoints = tryCatch(
  async (req: GetServicePointsRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.postalCode) {
        throw new ServerError(StatusCodes.BAD_REQUEST, "No postal code given");
      }
      const response = await servicePointsFromPostalCode(req.params.postalCode);
      res
        .status(StatusCodes.OK)
        .json(response.servicePointInformationResponse.servicePoints);
    } catch (error) {
      console.error("Failed to get service points", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  }
);
