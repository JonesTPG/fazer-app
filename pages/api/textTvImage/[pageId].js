export default async (req, res) => {
  const API_URL = process.env.API_URL;
  const APP_CREDENTIALS = process.env.API_CREDENTIALS;
  const { pageId } = req.query;

  const url =
    API_URL + "teletext/images/" + pageId + "/1.png?" + APP_CREDENTIALS;

  fetch(url)
    .then((response) => response.blob())
    .then((imageBlob) => {
      console.log(imageBlob);

      const fs = require("fs");

      const filepath = "temp.png";
      fs.writeFileSync(filepath, imageBlob);
      res.sendFile(filepath);
    });
};
