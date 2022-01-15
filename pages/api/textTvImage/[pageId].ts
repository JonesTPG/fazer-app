import https from "https";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const API_URL = process.env.API_URL;
  const APP_CREDENTIALS = process.env.API_CREDENTIALS;
  const { pageId } = req.query;

  const url = `${API_URL}teletext/images/${pageId}/1.png?${APP_CREDENTIALS}`;

  https.get(url, (mapRes) => mapRes.pipe(res));
};
