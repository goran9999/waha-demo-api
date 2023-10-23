import express from "express";
import { decode } from "jsonwebtoken";
import { User, UserModel } from "../../../db/models/user.model";
export const loginUser = express.Router();

export async function userLoginHandler(req, res) {
  const jwt: string = req.query["jwt"] as string;
  const decodedData = decode(jwt, { json: true });

  const foundUser = await UserModel.findOne({
    googleID: decodedData.sub,
  });

  if (!foundUser) {
    const user = new UserModel({
      createdAt: new Date(),
      email: decodedData.email,
      googleAuth: {
        accessToken: jwt,
        refreshToken: "",
        scope: "",
      },
      googleID: decodedData.sub,
      image: decodedData.picture,
      lastLogin: new Date(),
      lastName: decodedData.family_name,
      name: decodedData.given_name,
      phoneNumbers: [],
    });
    const savedUser = await user.save();

    return res.status(200).json({ user: savedUser });
  } else {
    return res.status(200).json({ user: foundUser });
  }
}
