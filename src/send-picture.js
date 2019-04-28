const sendPicture = ({ memory, logger }) => (req, res) => {
  if (memory.get() === null) return res.send("Nothing saved");

  const { mimeType, date, data } = memory.get();
  res.set("Content-Type", mimeType);
  res.end(data, "binary");
};

module.exports = sendPicture;
