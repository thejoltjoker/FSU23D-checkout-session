import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { servicePointsFromPostalCode } from "../services/postnord.service";

interface GetServicePointsRequest extends Request {
  params: {
    postalCode: string;
  };
}

export const getServicePoints = async (
  req: GetServicePointsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await servicePointsFromPostalCode(req.params.postalCode);
    res
      .status(StatusCodes.OK)
      .json(response.servicePointInformationResponse.servicePoints);
  } catch (error) {
    console.error("Failed to get service points", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
