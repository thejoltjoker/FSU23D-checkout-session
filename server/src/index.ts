import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieSession from "cookie-session";
import router from "./routers";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
