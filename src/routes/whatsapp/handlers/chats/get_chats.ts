import axios from "axios";
import { wahaEndpoint } from "../../../../utils/constants";
import { extractUserFromJwt } from "../../../../utils/helpers";
import { WhatsappChat } from "../../dtos/message.dto";

export async function getChats(req, res) {
  try {
    //TODO:should be loaded from user's id
    const googleID = extractUserFromJwt(req);
    const rawChats = await axios.get(`${wahaEndpoint}/${googleID}/chats`);

    const chats = rawChats.data;

    const parsedChats: WhatsappChat[] = chats.map((c: any) => {
      return {
        name: c.name,
        lastMessage: {
          body: c.lastMessage?.body,
          from: c.lastMessage?.from.user ?? "",
          sentAt: new Date(c.lastMessage?.timestamp * 1000),
        },
        user: c.id.user,
      };
    });

    const appendedChats = await Promise.all(
      parsedChats.map(async (p) => {
        try {
          const userProfile = await axios.get(
            `${wahaEndpoint}/contacts/profile-picture?session=${googleID}&contactId=${p.user}`
          );
          if (userProfile.data && userProfile.data.profilePictureURL) {
            return { ...p, contactImage: userProfile.data.profilePictureURL };
          } else {
            return { ...p };
          }
        } catch (error) {
          return { ...p };
        }
      })
    );

    return res.status(200).json({ chats: appendedChats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
