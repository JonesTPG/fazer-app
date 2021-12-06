import https from "https";

export default async (req, res) => {
  const API_URL = process.env.API_URL;
  const APP_CREDENTIALS = process.env.API_CREDENTIALS;
  const { pageId } = req.query;

  const url = API_URL + "teletext/images/" + pageId + "/1.png?" + APP_CREDENTIALS;

  console.log(url);

  https.get(url, (mapRes) => mapRes.pipe(res));
};
