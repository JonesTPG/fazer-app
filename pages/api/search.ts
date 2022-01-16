import { searchFavoritePages } from "@lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.q;
  const textTvPages = await searchFavoritePages(Array.isArray(q) ? q[0] : q);
  res.status(200).json({ textTvPages });
};
