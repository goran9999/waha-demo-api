import {
  getDefaultSessionConfig,
  stoppedSession,
  wahaEndpoint,
} from "../../../utils/constants";
import axios from "axios";
import { UserModel } from "../../../db/models/user.model";
import { extractUserFromJwt } from "../../../utils/helpers";

export async function linkWhatsapp(req, res) {
  try {
    let hasActiveSession = true;
    const googleID = extractUserFromJwt(req);
    const existingUser = await UserModel.findOne({ googleID: googleID });
    if (!existingUser) throw new Error("User with given ID does not exist!");
    try {
      const sessions = await axios.get(`${wahaEndpoint}/sessions`);
      hasActiveSession =
        sessions.data.length > 0 &&
        sessions.data.some((s) => s.status === "WORKING");
    } catch (error) {
      hasActiveSession = false;
    }

    await axios.post(
      `${wahaEndpoint}/sessions/start`,
      getDefaultSessionConfig(googleID)
    );
    await new Promise((resolve) => setTimeout(resolve, 8000));

    const qrResponse = await axios.get(`${wahaEndpoint}/${googleID}/auth/qr`, {
      responseType: "arraybuffer",
    });
    const image = Buffer.from(qrResponse.data);
    return res.status(200).json({ qrCode: image.toString("base64") });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
