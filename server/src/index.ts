import express from "express";

import cors from "cors";
import "dotenv/config";
import cookieSession from "cookie-session";
import router from "./routers";
import { StatusCodes } from "http-status-codes";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    secret: process.env.SESSION_SECRET ?? "diagram-festive-plaything",
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use("/api", router);

app.use((req, res) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
