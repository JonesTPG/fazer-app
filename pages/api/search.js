import { searchFavoritePages } from "../../src/lib/redis";

export default async function handler(req, res) {
  const q = req.query.q;
  const textTvPages = await searchFavoritePages(q);
  res.status(200).json({ textTvPages });
}
