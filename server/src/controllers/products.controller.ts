import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { stripe } from "../services/stripe.service";

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
    const { productId } = req.params;
    const params = {
      expand: ["default_price"],
    };
    const products = await stripe.products.retrieve(productId, params);
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
    const params = { expand: ["data.default_price"] };
    const products = await stripe.products.list(params);
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
    const params = { product: req.params.productId };
    const prices = await stripe.prices.list(params);
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
    const coupons = await stripe.coupons.list();
    res.status(StatusCodes.OK).json(coupons);
  } catch (error) {
    console.error("Failed to get coupons", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
