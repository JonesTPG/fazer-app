import type { NextApiRequest, NextApiResponse } from "next";
import { createIndex } from "../../src/lib/redis";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await createIndex();
  res.status(200).send("ok");
};
