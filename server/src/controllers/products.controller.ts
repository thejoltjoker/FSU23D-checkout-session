import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { stripe } from "../services/stripe.service";
import { tryCatch } from "../utils/tryCatch";
import { ServerError } from "../models/ServerError";

interface GetProductRequest extends Request {
  params: {
    productId?: string;
  };
}

export const getProduct = tryCatch(
  async (req: GetProductRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    if (!productId) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "No product id given");
    }

    const params = {
      expand: ["default_price"],
    };
    const products = await stripe.products.retrieve(productId, params);
    res.status(StatusCodes.OK).json(products);
  }
);

export const getAllProducts = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = { expand: ["data.default_price"], active: true };
      const products = await stripe.products.list(params);
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      console.error("Failed to get products", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  }
);

interface GetAllPricesRequest extends Request {
  params: {
    productId?: string;
  };
}

export const getAllPrices = tryCatch(
  async (req: GetAllPricesRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    if (!productId) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "No product id given");
    }

    const prices = await stripe.prices.list({ product: productId });
    res.status(StatusCodes.OK).json(prices);
  }
);

export const getAllCoupons = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const coupons = await stripe.coupons.list();
      res.status(StatusCodes.OK).json(coupons);
    } catch (error) {
      console.error("Failed to get coupons", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  }
);

interface GetCouponIdFromPromotionRequest extends Request {
  params: {
    promotionCode?: string;
  };
}

export const getCouponIdFromPromotion = tryCatch(
  async (
    req: GetCouponIdFromPromotionRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { promotionCode } = req.params;
      if (!promotionCode) {
        throw new ServerError(
          StatusCodes.BAD_REQUEST,
          "No promotion code given"
        );
      }
      const promotionCodes = await stripe.promotionCodes.list({});
      const matchedPromotion = promotionCodes.data.find(
        (d) => d.code === promotionCode
      );

      if (matchedPromotion) {
        return res.status(StatusCodes.OK).json({
          id: matchedPromotion.coupon.id,
          valid: matchedPromotion.coupon.valid,
          amount_off: matchedPromotion.coupon.amount_off,
          percent_off: matchedPromotion.coupon.percent_off,
        });
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Promotion code not found" });
      }
    } catch (error) {
      console.error("Failed to get coupon", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong");
    }
  }
);
