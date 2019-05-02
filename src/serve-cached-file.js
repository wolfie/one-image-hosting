const fs = require("fs");

const serveFavicon = ({ filePath, logger }) => {
  let fileCache = null;

  const updateCache = () =>
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

  fs.watchFile(filePath, updateCache);
  updateCache();

  return (req, res) => {
    if (fileCache === null) {
      res.status(404).end();
    } else {
      res.end(fileCache, "binary");
    }
  };
};

module.exports = serveFavicon;
