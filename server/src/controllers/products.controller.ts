import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import {
  listCoupons,
  listPrices,
  listProducts,
  retrieveProduct,
} from "../services/stripe.service";

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
    const products = await retrieveProduct(req.params.productId, {
      expand: ["default_price"],
    });
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
    const products = await listProducts({ expand: ["data.default_price"] });
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error("Failed to get products", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

interface GetAllPricesRequest extends Request {
  params: {
    productId: string;
  };
}

export const getAllPrices = async (
  req: GetAllPricesRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const prices = await listPrices({ product: req.params.productId });
    res.status(StatusCodes.OK).json(prices);
  } catch (error) {
    console.error("Failed to get prices", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

export const getAllCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await listCoupons();
    console.log(coupons);
    res.status(StatusCodes.OK).json(coupons);
  } catch (error) {
    console.error("Failed to get coupons", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
