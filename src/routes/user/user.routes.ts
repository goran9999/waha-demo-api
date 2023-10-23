import express from "express";
import { userLoginHandler } from "./handlers/login-user";
import { getMe } from "./handlers/me";

export const UserRoutes = express.Router();

UserRoutes.get("/user/register", userLoginHandler).get(
  "/user/me/:email",
  getMe
);
