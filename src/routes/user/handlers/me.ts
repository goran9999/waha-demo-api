import { UserModel } from "../../../db/models/user.model";

export async function getMe(req, res) {
  try {
    const email = req.params.email;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found!" });

    return res.status(200).json({ user: existingUser });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
