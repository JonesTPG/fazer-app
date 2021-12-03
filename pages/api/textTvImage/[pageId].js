import fs from "fs";
import path from "path";

export default async (req, res) => {
  const API_URL = process.env.API_URL;
  const APP_CREDENTIALS = process.env.API_CREDENTIALS;
  const { pageId } = req.query;

  const url =
    API_URL + "teletext/images/" + pageId + "/1.png?" + APP_CREDENTIALS;

  fetch(url).then((response) => {
    console.log(response);

    const filepath = "temp.png";
    fs.writeFileSync(filepath, response);

    const filePath = path.resolve(".", "temp.png");
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);
  });
};
