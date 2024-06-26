import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { stripe } from "../services/stripe.service";
import { get as getUser, upsert as upsertUser } from "../services/user.service";
import { ServerError } from "../models/ServerError";
import { tryCatch } from "../utils/tryCatch";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
interface RegisterRequest extends Request {
  body: RegisterBody;
}

export const register = tryCatch(
  async (req: RegisterRequest, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const exisitingUser = await getUser(email);

      if (exisitingUser) {
        return res.status(StatusCodes.CONFLICT).json("User exists");
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const customerSearchResponse = await stripe.customers.search({
        query: `email:'${email}'`,
      });
      const existingCustomer = customerSearchResponse.data[0];
      let customer = existingCustomer;
      if (!existingCustomer) {
        customer = await stripe.customers.create({ name: name, email: email });
      }
      await upsertUser({
        name: name,
        email: email,
        password: passwordHash,
        customerId: customer.id,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ name: name, email: email, customerId: customer.id });
    } catch (error) {
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to retrieve user"
      );
    }
  }
);

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const login = tryCatch(
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const existingUser = await getUser(email);

      if (
        !existingUser ||
        !(await bcrypt.compare(password, existingUser.password))
      ) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json("Invalid email or password");
      }

      // TODO Clean this up a bit
      req.session
        ? (req.session.user = {
            name: existingUser.name,
            email: existingUser.email,
            customerId: existingUser.customerId,
          })
        : (req.session = {
            user: {
              name: existingUser.name,
              email: existingUser.email,
              customerId: existingUser.customerId,
            },
          });

      res.status(StatusCodes.OK).json({
        name: existingUser.name,
        email: existingUser.email,
        customerId: existingUser.customerId,
      });
    } catch (error) {
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to login user"
      );
    }
  }
);

export const logout = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session = null;

      res.status(StatusCodes.OK).json("User logged out");
    } catch (error) {
      console.error("Failed to logout user", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something went wrong");
    }
  }
);

export const authorize = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session?.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json("User not logged in");
      }
      const user = await getUser(req.session.user.email);
      if (user) {
        res.status(StatusCodes.OK).json({
          name: user.name,
          email: user.email,
          customerId: user.customerId,
        });
      }
    } catch (error) {
      throw new ServerError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed when trying to authorize user"
      );
    }
  }
);
