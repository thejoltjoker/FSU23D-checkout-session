import { NextFunction, Request, Response } from "express";
import { Md5 } from "ts-md5";
import { StatusCodes } from "http-status-codes";
import { stripe } from "../services/stripe.service";
import {
  findByCustomerId,
  upsert as upsertOrder,
} from "../services/order.service";
import { Order } from "../schemas/OrderSchema";
import { ServerError } from "../models/ServerError";

interface SaveOrderRequest extends Request {
  body: Order;
}

export const saveOrder = async (
  req: SaveOrderRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order: Order = req.body;
    order.id = Md5.hashStr(
      `${order.id}${order.customerId}${order.totalAmount}`
    );
    await upsertOrder(order);
    return res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    console.log(error);
    throw new ServerError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to save order"
    );
  }
};

interface Session extends CookieSessionInterfaces.CookieSessionObject {
  user: {
    name: string;
    email: string;
    customerId: string;
  };
}
interface GetOrdersRequest extends Request {
  params: { customerId: string };
  session?: CookieSessionInterfaces.CookieSessionObject | null | undefined;
}

export const getOrders = async (
  req: GetOrdersRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId } = req.params;
    const session = req.session as Session;
    if (customerId != session?.user.customerId) {
      throw new ServerError(
        StatusCodes.UNAUTHORIZED,
        "User doesn't have access to this resource"
      );
    }

    const orders = await findByCustomerId(customerId);
    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.log(error);
    throw new ServerError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to save order"
    );
  }
};
