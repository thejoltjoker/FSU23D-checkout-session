import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import { ServerError } from "../models/ServerError";
import { resend } from "../services/resend.service";
import { tryCatch } from "../utils/tryCatch";

interface CookieSession extends CookieSessionInterfaces.CookieSessionObject {
  user?: {
    name: string;
    email: string;
    customerId: string;
  };
}
interface SendEmailConfirmationRequest extends Request {
  body: Stripe.Checkout.Session;
  session?: CookieSession | null | undefined;
}

export const sendEmailConfirmation = tryCatch(
  async (
    req: SendEmailConfirmationRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.session?.user) {
      throw new ServerError(StatusCodes.UNAUTHORIZED, "User not logged in");
    }

    if (req.session.user.email != req.body.customer_details?.email) {
      throw new ServerError(StatusCodes.UNAUTHORIZED, "Not the user's session");
    }

    const { name, email } = req.session.user;
    console.log("Sending email to", name, email);
    await resend.emails.send({
      from: "King Kong <king.kong@checkout-session.sideproject.se>",
      to: `${name} <${email}>`,
      subject: `Order confirmation - King Kong's Banana Kingdom`,
      html: "<p>Order complete!</p>",
    });
    res.status(StatusCodes.OK).json("Email sent");
  }
);
