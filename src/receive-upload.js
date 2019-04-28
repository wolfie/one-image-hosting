const prettyBytes = require("pretty-bytes");

const receiveUpload = ({ logger, memory, sharedSecret }) => (req, res) => {
  const givenSharedSecret = req.get("x-shared-secret");
  if (givenSharedSecret !== sharedSecret) {
    logger("Rejected upload with bad shared secret: " + givenSharedSecret);
    return res.status(400).send("Nope");
  }

  if (!req.files || Object.values(req.files).length !== 1) {
    return res.status(400).send("Need exactly one file");
  }

  const fileInfo = Object.values(req.files)[0];
  const date = new Date();

  logger(
    `Received ${fileInfo.name} (${prettyBytes(fileInfo.size)}), ${
      fileInfo.mimetype
    }`
  );

  const imageData = {
    mimeType: fileInfo.mimetype,
    data: fileInfo.data,
    date: date
  };

  memory.set(imageData);
  res.send("Image updated");
};

module.exports = receiveUpload;
