import type { NextApiRequest, NextApiResponse } from "next";
import { createFavoriteTextTvPage } from "../../src/lib/redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = await createFavoriteTextTvPage(req.body);
  console.log(id);
  res.status(200).json({ id });
};
