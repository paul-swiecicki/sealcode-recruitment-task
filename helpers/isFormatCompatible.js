const { COMPATIBLE_FORMATS } = require("../constants/constants");

const isFormatCompatible = (format) => {
  const lowerFormat = format.toLowerCase();

  return COMPATIBLE_FORMATS.some((compFormat) => compFormat === lowerFormat);
};

module.exports = { isFormatCompatible };
