const fs = require("fs");

let fileCache = null;

const serveFavicon = ({ filePath, logger }) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      logger(
        err.code === "ENOENT"
          ? `${filePath} does not exist, so no file will be served`
          : `File reading error: ${err}`
      );
    } else {
      logger(`Found ${filePath}. Will cache and use that`);
      fileCache = data;
    }
  });

  return (req, res) => {
    if (fileCache === null) {
      res.status(404).end();
    } else {
      res.end(fileCache, "binary");
    }
  };
};

module.exports = serveFavicon;
