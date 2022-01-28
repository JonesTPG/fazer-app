import { createTodos } from "@lib/todos";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req);
  const { username } = JSON.parse(req.body);

  if (!clientIp || !username) {
    res.status(400).end();
    return;
  }

  const data = await createTodos(clientIp as string, username);

  res.status(200).json({ data });
};
