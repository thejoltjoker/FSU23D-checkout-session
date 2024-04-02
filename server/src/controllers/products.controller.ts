import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { listProducts, retrieveProduct } from "../services/stripe.service";

interface GetProductRequest extends Request {
  params: {
    productId: string;
  };
}
export const getProduct = async (
  req: GetProductRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await retrieveProduct(req.params.productId);
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error("Failed to get product", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await listProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error("Failed to get products", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
