import axios from "axios";
import { wahaEndpoint } from "../../../../utils/constants";
import { extractUserFromJwt } from "../../../../utils/helpers";
import { WhatsappMessage } from "../../dtos/message.dto";

export async function getChatMessages(req, res) {
  const chatId = req.params.chatId;
  try {
    const googleID = extractUserFromJwt(req);
    //TODO:user id goes instead of default session
    const { data } = await axios.get(
      `${wahaEndpoint}/${googleID}/chats/${chatId}/messages?limit=100&downloadMedia=true`
    );

    const parsedMessages: WhatsappMessage[] = data.map((message) => {
      return {
        body: message.body,
        fromMe: message.fromMe,
        to: message.to,
        sentAt: new Date(message.timestamp * 100),
        viewed: message._data.viewed,
        session: googleID,
        mediaUrl: message.mediaUrl,
      };
    });
    console.log(parsedMessages[parsedMessages.length - 1]);
    return res.status(200).json({ messages: parsedMessages });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
