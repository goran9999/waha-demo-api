import axios from "axios";
import { wahaEndpoint } from "../../../../utils/constants";
import { extractUserFromJwt } from "../../../../utils/helpers";

export async function sendMessage(req, res) {
  try {
    const { message, chat, image } = req.body;

    const googleID = extractUserFromJwt(req);

    if (image) {
      await axios.post(`${wahaEndpoint}/sendImage`, {
        chatId: chat,
        text: message,
        session: googleID,
        file: {
          mimetype: "image/jpeg",
          filename: `${new Date().toISOString()}.jpeg`,
          data: image.replace(/^data:image\/\w+;base64,/, ""),
        },
      });
    } else {
      await axios.post(`${wahaEndpoint}/sendText`, {
        chatId: chat,
        text: message,
        session: googleID,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
