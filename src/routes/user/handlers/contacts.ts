import express from "express";
import { UserContactModel } from "../../../db/models/user_contact";

export const contactsRouter = express.Router();

contactsRouter.get("/contacts/:userId", async (req, res) => {
  const params = req.params;

  const userContacts = await UserContactModel.find({ user: params.userId });

  return res.status(200).json({ contacts: userContacts });
});
