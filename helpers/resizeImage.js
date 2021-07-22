const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { ensureExists } = require("./ensureExists");
const { RESIZED_DIR_REMOVAL_DELAY } = require("../constants/constants");

// make sure that sharp doesn't use images stored in cache sent earlier by other users
sharp.cache({ files: 0 });

/**
 * @param {Object} obj
 * @param {String} obj.outputDirectory path to main output directory
 * @param {Number|String} obj.size
 * @param {String} obj.imageExtension
 * @param {String} obj.uid
 * @returns Output path (including image istelf) for resized image
 */
const getResizedImagePath = ({
  outputDirectory,
  size,
  imageExtension,
  uid,
}) => {
  const UIDDirectory = path.join(outputDirectory, uid);

  const outputPath = path.join(
    UIDDirectory,
    `/resized-${size}${imageExtension}`
  );

  return outputPath;
};

/**
 * Resizes image to sizes provided in `sizes` array and output them
 * to directory named by `uid` property
 *
 * @param {Object} obj
 * @param {String} obj.inputPath Path to input image (including image itself)
 * @param {String} obj.outputDirectory Path to output directory
 * @param {Number[]} obj.sizes Array of sizes in pixels to which images will be resized
 * @param {String} obj.imageExtension i.e. `.png`
 * @param {String} obj.uid
 * @returns {Promise.<{size: File}>} Object containing images assigned to sizes provided in the `sizes` array
 */
const resizeImage = ({
  inputPath,
  outputDirectory,
  sizes,
  imageExtension,
  uid,
}) =>
  new Promise((resolve, reject) => {
    const image = sharp(inputPath);

    const UIDDirectory = path.join(outputDirectory, uid);
    ensureExists(UIDDirectory, (err) => {
      if (err) reject(err);
    });

    const PromisesOfResizedImages = sizes.map((size) => {
      const outputPath = getResizedImagePath({
        imageExtension,
        size,
        outputDirectory,
        uid,
      });

      return image.resize(size).toFile(outputPath);
    });

    Promise.all(PromisesOfResizedImages)
      .then((resizedImages) => {
        const output = {};
        sizes.forEach((size, i) => (output[size] = resizedImages[i]));

        setTimeout(() => {
          fs.rmdirSync(UIDDirectory, { recursive: true });
        }, RESIZED_DIR_REMOVAL_DELAY);

        resolve(output);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { resizeImage, getResizedImagePath };
