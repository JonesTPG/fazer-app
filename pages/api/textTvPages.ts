import { createFavoriteTextTvPage } from "@lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = await createFavoriteTextTvPage(req.body);
  console.log(id);
  res.status(200).json({ id });
};
