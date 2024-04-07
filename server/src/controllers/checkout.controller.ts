import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import {
  createCheckoutSession,
  retrieveCheckoutSession,
} from "../services/stripe.service";

interface CreateSessionRequest extends Request {
  body: Stripe.Checkout.SessionCreateParams;
}

export const createSession = async (
  req: CreateSessionRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const createSessionParams: Stripe.Checkout.SessionCreateParams = {
      ...{
        mode: "payment",
        success_url:
          "http://localhost:5173/checkout/success?sessionId={CHECKOUT_SESSION_ID}",
        cancel_url:
          "http://localhost:5173/checkout/cancel?sessionId={CHECKOUT_SESSION_ID}",
      },
      ...req.body,
    };
    const response = await createCheckoutSession(createSessionParams);
    console.log(response);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error("Failed to create checkout session", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};

interface GetSessionRequest extends Request {
  params: { sessionId: string };
}

export const getSession = async (
  req: GetSessionRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.sessionId);
    const response = await retrieveCheckoutSession(req.params.sessionId);
    console.log(response);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error("Failed to create checkout session", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  }
};
