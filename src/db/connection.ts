import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export class MongooseConnection {
  static async connectToDb() {
    try {
      const dbUrl = process.env.MONGO_URL;
      const db = process.env.MONGO_DB!;
      await mongoose.connect(`${dbUrl}/${db}`);
      console.log(`Connected to DB!`);
    } catch (error) {
      console.log(error);
    }
  }
}
