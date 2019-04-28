const leadingZero = num => (num < 10 ? "0" + num : "" + num);

/** @param {Date} date */
const getTimestamp = (date = new Date()) =>
  `${date.getFullYear()}-${leadingZero(date.getMonth())}-${leadingZero(
    date.getDate()
  )} ${leadingZero(date.getHours())}:${leadingZero(
    date.getMinutes()
  )}:${leadingZero(date.getSeconds())}`;

const logger = string => console.log(`[${getTimestamp()}] ${string}`) || true;

module.exports = logger;
