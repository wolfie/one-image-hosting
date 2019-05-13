const oneImageHosting = require("./src");

let errors = [];

const getEnv = name =>
  process.env[name] || errors.push("Need environment variable " + name);

const getSharedSecret = () => getEnv("SHARED_SECRET");
const getPort = () => getEnv("PORT");

const opts = {
  sharedSecret: getSharedSecret(),
  port: getPort()
};

if (errors.length > 0) {
  errors.forEach(err => console.error(err));
  process.exit(1);
}

oneImageHosting(opts);
