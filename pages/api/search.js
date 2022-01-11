import { searchTextTvPages } from "../../lib/redis";

export default async function handler(req, res) {
  const q = req.query.q;
  const textTvPages = await searchTextTvPages(q);
  res.status(200).json({ textTvPages });
}
