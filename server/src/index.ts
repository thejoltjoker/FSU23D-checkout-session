import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieSession from "cookie-session";
import router from "./routers";
import { StatusCodes } from "http-status-codes";
import helmet from "helmet";
import { ServerError } from "./models/ServerError";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET ?? "diagram-festive-plaything",
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/api", router);

app.use("/error", (req: Request, res: Response) => {
  throw new ServerError(500, "Something went wrong");
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      message: err.message || "Something went wrong",
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
