import mongoose from "mongoose";

export interface User {
  email: string;
  waName: string;
  phoneNumbers: string[];
  name: string;
  lastName: string;
  image: string;
  googleID: string;
  lastLogin: Date;
  googleAuth: GoogleAuth;
  createdAt: Date;
}

export interface GoogleAuth {
  accessToken: string;
  refreshToken: string;
  scope: string;
}

const GoogleAuthSchema = new mongoose.Schema<GoogleAuth>({
  accessToken: String,
  refreshToken: String,
  scope: String,
});

const userSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: false },
    waName: { type: String, required: false },
    lastLogin: { type: Date },
    name: String,
    lastName: String,
    image: String,
    createdAt: { type: Date, default: new Date() },
    googleAuth: GoogleAuthSchema,
    phoneNumbers: [String],
    googleID: { type: String, required: true, unique: true },
  },
  {
    virtuals: {},
    statics: {
      findByEmail(email: string) {
        return this.findOne({ email });
      },
    },
  }
);

export const UserModel = mongoose.model("User", userSchema);
