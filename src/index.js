const express = require("express");
const fileUpload = require("express-fileupload");
const sendPicture = require("./send-picture");
const receiveUpload = require("./receive-upload");
const memory = require("./memory");
const logger = require("./logger");
const serveFavicon = require("./serve-favicon.js");
const app = express();

const getSharedSecret = () => {
  if (process.env["SHARED_SECRET"]) return process.env["SHARED_SECRET"];
  else {
    console.error("Need environment variable SHARED_SECRET");
    process.exit(1);
  }
};

const PORT = 80;
const BAD_REQUEST = 400;
const METHOD_NOT_ALLOWED = 405;
const sharedSecret = getSharedSecret();

app.disable("x-powered-by");
app.use(fileUpload());

app.get("/favicon.ico", serveFavicon({ logger }));
app.get("/", sendPicture({ logger, memory }));
app.put("/", receiveUpload({ logger, memory, sharedSecret }));
app.all(
  "/*",
  (req, res) =>
    logger(`Invalid: ${req.method} (${req.path}) from ${req.ip}`) &&
    res.status(BAD_REQUEST).send("Nope")
);

app.listen(PORT, () =>
  logger(`Server started on port ${PORT} with shared secret: ${sharedSecret}`)
);
