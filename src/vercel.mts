import { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "./app.mjs";

const app = createApp();

export default async (req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit("request", req, res);
};
