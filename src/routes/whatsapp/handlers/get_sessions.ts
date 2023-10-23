import axios from "axios";
import { UserModel } from "../../../db/models/user.model";
import { wahaEndpoint } from "../../../utils/constants";
import { extractUserFromJwt } from "../../../utils/helpers";

export async function getSessions(req, res) {
  try {
    const googleID = extractUserFromJwt(req);
    const sessions = await axios.get(`${wahaEndpoint}/sessions`);

    const workingSession = sessions.data.find(
      (s) => s.status === "WORKING" && s.name === googleID
    );
    if (workingSession) {
      //TODO:this needs to be handled differently when multiple sessions enabled
      await UserModel.updateMany(
        {},
        {
          $set: {
            phoneNumbers: [workingSession.me.id.split("@")[0]],
            waName: workingSession.me.pushName,
          },
        }
      );
    }

    return res.status(200).json({ sessions: sessions.data });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
