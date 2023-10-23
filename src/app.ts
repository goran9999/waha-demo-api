import express from "express";
import cors from "cors";
import { MongooseConnection } from "./db/connection";
import { UserRoutes } from "./routes/user/user.routes";
import { WhatsappRouter } from "./routes/whatsapp/whatsapp.routes";
import { json, urlencoded } from "body-parser";
import { Server } from "socket.io";

import { createServer } from "http";
import { decodePlainJwt } from "./utils/helpers";
import { logger } from "./utils/logger";
const port = process.env.PORT ? Number(process.env.PORT) : 5500;

const app = express();

app.use(cors({ origin: "*", allowedHeaders: "*" }));

const server = createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
global.io = io;

app.use(urlencoded({ extended: true }));
app.use(json({ limit: "500mb" }));
io.on("connection", (socket) => {
  socket.on("auth", (jwt) => {
    const email = decodePlainJwt(jwt);
    logger.info(`User ${email} joined socket`);
    socket.join(email);
  });
});

MongooseConnection.connectToDb();

app.use("/api/v1", UserRoutes);
app.use("/api/v1", WhatsappRouter);

server.listen(port, () => {
  console.log("Listening on port:", port);
});
