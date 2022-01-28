import { deleteTodos } from "@lib/todos";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req);
  const { todos } = JSON.parse(req.body);
  if (!clientIp || !todos) {
    res.status(400).end();
  }

  const data = await deleteTodos(clientIp as string, todos);

  res.status(200).json({ data });
};
