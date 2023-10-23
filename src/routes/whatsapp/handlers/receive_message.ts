import { logger } from "../../../utils/logger";
import { WhatsappMessage } from "../dtos/message.dto";

export async function receiveMessage(req, res) {
  const io = global.io;
  try {
    const messageDto = req.body.payload;

    const message: WhatsappMessage = {
      body: messageDto.body,
      fromMe: messageDto.fromMe,
      session: req.body.session,
      to: messageDto.to,
      viewed: messageDto._data.viewed,
      sentAt: new Date(),
      mediaUrl:
        messageDto._data.type === "image"
          ? "data:image/png;base64," + messageDto._data.body
          : undefined,
    };

    console.log(message);
    io.to(req.body.session).emit(
      "message",
      JSON.stringify({ event: "message", body: JSON.stringify(message) })
    );

    logger.log("info", `Received message sent to ${message.to}`);

    return res.status(200).json({ message: "Success" });
  } catch (error: any) {
    io.to(req.body.session).emit("message", "Failed to send messageeee");
    logger.error("Failed to send message:", error.message);

    return res.status(500).json({ message: "Failed" });
  }
}
function userId(userId: any) {
  throw new Error("Function not implemented.");
}
