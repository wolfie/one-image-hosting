const express = require("express");
const fileUpload = require("express-fileupload");
const sendPicture = require("./send-picture");
const receiveUpload = require("./receive-upload");
const memory = require("./memory");
const logger = require("./logger");
const serveCachedFile = require("./serve-cached-file");
const app = express();

const BAD_REQUEST = 400;
const STATIC_PATH = `${__dirname}/../static`;

const oneImageHosting = ({ port, sharedSecret }) => {
  app.disable("x-powered-by");
  app.use(fileUpload());

  app.get(
    "/favicon.ico",
    serveCachedFile({ filePath: `${STATIC_PATH}/favicon.ico`, logger })
  );
  app.get(
    "/",
    serveCachedFile({ filePath: `${STATIC_PATH}/index.html`, logger })
  );
  app.get("/image.jpg", sendPicture({ logger, memory }));
  app.put("/image.jpg", receiveUpload({ logger, memory, sharedSecret }));
  app.all(
    "/*",
    (req, res) =>
      logger(`Invalid: ${req.method} (${req.path}) from ${req.ip}`) &&
      res.status(BAD_REQUEST).send("Nope")
  );

  app.listen(port, () =>
    logger(`Server started on port ${port} with shared secret: ${sharedSecret}`)
  );
};

module.exports = oneImageHosting;
