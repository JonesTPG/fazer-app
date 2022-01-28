import { createTodos } from "@lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req);
  if (!clientIp || !req.body?.username) {
    res.status(400).end();
  }

  const data = await createTodos(clientIp as string, req.body.username);

  res.status(200).json({ data });
};
