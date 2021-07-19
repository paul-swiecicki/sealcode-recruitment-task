const fs = require("fs");

/**
 * Ensures directory exists
 * @param {String} path
 * @param {Number} mask
 * @param {Function} cb
 */
function ensureExists(path, mask, cb) {
  if (typeof mask == "function") {
    cb = mask;
    mask = 0777;
  }
  fs.mkdir(path, mask, function (err) {
    if (err) {
      if (err.code == "EEXIST") cb(null);
      // Ignore the error if the folder already exists
      else cb(err);
    } else cb(null);
  });
}

module.exports = { ensureExists };
