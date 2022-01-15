import type { NextApiRequest, NextApiResponse } from "next";
import { searchFavoritePages } from "../../src/lib/redis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.q;
  const textTvPages = await searchFavoritePages(Array.isArray(q) ? q[0] : q);
  res.status(200).json({ textTvPages });
};
