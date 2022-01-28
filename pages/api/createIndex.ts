import { createIndex } from "@lib/redis";
import { createTodoIndex } from "@lib/todos";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await createIndex();
  await createTodoIndex();
  res.status(200).send("ok");
};
