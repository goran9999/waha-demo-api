import express from "express";
import { getChats } from "./handlers/chats/get_chats";
import { getChatMessages } from "./handlers/chats/get_chat_messages";
import { sendMessage } from "./handlers/chats/sendMessage";
import { getSessions } from "./handlers/get_sessions";
import { linkWhatsapp } from "./handlers/link_whatsapp";
import { receiveMessage } from "./handlers/receive_message";
import { webhookHandler } from "./handlers/webhook";

export const WhatsappRouter = express.Router();

WhatsappRouter.get("/whatsapp/link/:userId", linkWhatsapp)
  .post("/whatsapp/webhook", webhookHandler)
  .post("/whatsapp/webhook/message", receiveMessage)
  .get("/whatsapp/sessions", getSessions)
  .get("/whatsapp/chats", getChats)
  .get("/whatsapp/chats/:chatId", getChatMessages)
  .post("/whatsapp/sendText", sendMessage);
