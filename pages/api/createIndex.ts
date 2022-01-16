import { createIndex } from "@lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await createIndex();
  res.status(200).send("ok");
};
