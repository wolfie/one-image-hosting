const fs = require("fs");
const path = require("path");

let faviconCache = null;
const FAVICON_PATH = path.resolve(__dirname, "../static/favicon.ico");

const serveFavicon = ({ logger }) => {
  fs.readFile(FAVICON_PATH, (err, data) => {
    if (err) {
      logger(
        err.code === "ENOENT"
          ? `${FAVICON_PATH} does not exist, so no favicon will be served`
          : `Favicon reading error: ${err}`
      );
    } else {
      logger(`Found ${FAVICON_PATH}. Will cache and use that`);
      faviconCache = data;
    }
  });

  return (req, res) => {
    if (faviconCache === null) {
      res.status(404).end();
    } else {
      res.end(faviconCache, "binary");
    }
  };
};

module.exports = serveFavicon;
