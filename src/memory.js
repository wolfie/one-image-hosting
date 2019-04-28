let _ = null;

const memory = {
  set: data => (_ = data),
  get: () => _
};

module.exports = memory;
