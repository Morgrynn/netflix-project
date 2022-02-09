import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { userRouter } from "./routes/user";
import { loginRouter } from "./routes/login";
import { registerRouter } from "./routes/register";
import { logoutRouter } from "./routes/logout";
import { errorHandler } from "./middlewares/errorHandlers";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(registerRouter);
app.use(loginRouter);
app.use(userRouter);
app.use(logoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log("NF-Auth: Listening on port 5000");
  });
};

start();
