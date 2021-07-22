const IMAGE_RESIZE_SIZES = [100, 200, 400];
const COMPATIBLE_FORMATS = [".png", ".jpg", ".jpeg"];

const SEC = 1000;
const MIN = SEC * 60;
/**
 * When image is uploaded, resized and placed in uid named directory,
 * after this amount of time the directory will be removed.
 */
const RESIZED_DIR_REMOVAL_DELAY = MIN * 20;

module.exports = {
  IMAGE_RESIZE_SIZES,
  COMPATIBLE_FORMATS,
  RESIZED_DIR_REMOVAL_DELAY,
};
