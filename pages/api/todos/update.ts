import { updateTodos } from "@lib/todos";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = requestIp.getClientIp(req);
  if (!clientIp || !req.body?.todos) {
    res.status(400).end();
  }

  const data = await updateTodos(clientIp as string, req.body.todos);

  res.status(200).json({ data });
};
