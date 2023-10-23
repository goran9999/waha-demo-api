import axios from "axios";
import { wahaEndpoint } from "../../../../utils/constants";
import { extractUserFromJwt } from "../../../../utils/helpers";

export async function sendMessage(req, res) {
  try {
    const { message, chat } = req.body;

    const googleID = extractUserFromJwt(req);

    await axios.post(`${wahaEndpoint}/sendText`, {
      chatId: chat,
      text: message,
      session: googleID,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
