import { createFavoriteTextTvPage } from "../../src/lib/redis";

export default async function handler(req, res) {
  const id = await createFavoriteTextTvPage(req.body);
  console.log(id);
  res.status(200).json({ id });
}
