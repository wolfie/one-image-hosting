const express = require("express");
const fileUpload = require("express-fileupload");
const sendPicture = require("./send-picture");
const receiveUpload = require("./receive-upload");
const memory = require("./memory");
const logger = require("./logger");
const app = express();

const PORT = 80;
const BAD_REQUEST = 400;
const METHOD_NOT_ALLOWED = 405;

app.disable("x-powered-by");
app.use(fileUpload());

app.get("/", sendPicture({ logger, memory }));
app.put("/", receiveUpload({ logger, memory }));
app.all(
  "/*",
  (req, res) =>
    logger(`Invalid: ${req.method} (${req.path}) from ${req.ip}`) &&
    res.status(BAD_REQUEST).send("Nope")
);

app.listen(PORT, () => logger(`Server started on port ${PORT}`));
