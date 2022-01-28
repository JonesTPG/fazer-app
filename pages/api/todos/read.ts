import { readTodos } from "@lib/todos";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req);
  if (!clientIp) {
    res.status(400).end();
  }

  const data = await readTodos(clientIp as string);

  res.status(200).json({ data });
};
