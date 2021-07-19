const sharp = require("sharp");

/**
 * @param {Object} obj
 * @param {String} obj.outputDirectory
 * @param {String} obj.imageSize
 * @param {String} obj.imageExtension
 * @returns Output path (including image istelf) for resized images
 */
const getResizedImagePath = ({ outputDirectory, size, imageExtension }) => {
  return `${outputDirectory}/resized-${size}${imageExtension}`;
};

/**
 * Resizes image to sizes provided in `sizes` array.
 *
 * @param {Object} obj
 * @param {String} obj.inputPath Path to input image (including image itself)
 * @param {String} obj.outputDirectory Path to output directory
 * @param {Number[]} obj.sizes Array of sizes in pixels to which images will be resized
 * @param {String} obj.imageExtension i.e. `.png`
 * @returns {Promise.<{size: File}>} Object containing images assigned to sizes provided in the `sizes` array
 */
const resizeImage = ({ inputPath, outputDirectory, sizes, imageExtension }) =>
  new Promise((resolve, reject) => {
    if (!sizes.length) reject("Pass at least one size in the sizes array");
    if (!inputPath) reject("input path property not provided");
    if (!outputDirectory) reject("output directory property not provided");
    if (!imageExtension) reject("image extension property not provided");

    const image = sharp(inputPath);

    const PromisesOfResizedImages = sizes.map((size) => {
      const outputPath = getResizedImagePath({
        imageExtension,
        size,
        outputDirectory,
      });
      return image.resize(size).toFile(outputPath);
    });

    Promise.all(PromisesOfResizedImages)
      .then((resizedImages) => {
        const output = {};
        sizes.forEach((size, i) => (output[size] = resizedImages[i]));

        resolve(output);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { resizeImage, getResizedImagePath };
