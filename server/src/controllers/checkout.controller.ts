import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import { stripe } from "../services/stripe.service";
import { ServerError } from "../models/ServerError";
import { tryCatch } from "../utils/tryCatch";
import { ParamsDictionary } from "express-serve-static-core";

interface CreateSessionRequest extends Request {
  body: Stripe.Checkout.SessionCreateParams;
}

export const createSession = tryCatch(
  async (req: CreateSessionRequest, res: Response, next: NextFunction) => {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        ...{
          mode: "payment",
          success_url:
            "http://localhost:5173/checkout/success?sessionId={CHECKOUT_SESSION_ID}",
          cancel_url:
            "http://localhost:5173/checkout/cancel?sessionId={CHECKOUT_SESSION_ID}",
        },
        ...req.body,
      };
      const session = await stripe.checkout.sessions.create(params);
      req.params;
      res.status(StatusCodes.OK).json(session);
    } catch (error) {
      console.error(error);
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create checkout session"
      );
    }
  }
);

interface GetSessionRequest extends Request {
  params: { sessionId?: string };
}

export const getSession = tryCatch(
  async (req: GetSessionRequest, res: Response, next: NextFunction) => {
    if (!req.params.sessionId) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "No session id given");
    }
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });
    res.status(StatusCodes.OK).json(session);
  }
);
