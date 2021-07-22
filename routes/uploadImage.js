const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { uid } = require("uid");

const express = require("express");
const router = express.Router();

const { resizeImage, getResizedImagePath } = require("../helpers/resizeImage");
const { isFormatCompatible } = require("../helpers/isFormatCompatible");
const {
  IMAGE_RESIZE_SIZES,
  COMPATIBLE_FORMATS,
} = require("../constants/constants");

const upload = multer({
  dest: "./temp",
});

const getSizeLinks = (sizes, imageExtension, uid) => {
  const query = `imageExt=${imageExtension}&uid=${uid}`;
  return sizes.reduce(
    (acc, size) =>
      `${acc}<a href='/download/${size}?${query}'>pobierz</a> wersję ${size}px szerokości<br>`,
    "" // use empty string as inital value
  );
};

const resizedDirectory = path.join(__dirname, `../resized`);

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file)
    return res
      .status(403)
      .send("Select an image that you want to resize first");

  const imageExtension = path.extname(req.file.originalname).toLowerCase();
  const tempPath = req.file.path;

  const targetPath = path.join(__dirname, `../uploads/image${imageExtension}`);
  console.log({ tempPath, targetPath });

  if (isFormatCompatible(imageExtension)) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      const uuid = uid();

      resizeImage({
        inputPath: targetPath,
        outputDirectory: resizedDirectory,
        imageExtension,
        sizes: IMAGE_RESIZE_SIZES,
        uid: uuid,
      })
        .then(() => {
          res
            .status(200)
            .send(getSizeLinks(IMAGE_RESIZE_SIZES, imageExtension, uuid));
        })
        .catch((err) => {
          console.error(err);
          res.status(403).send(err.message);
        });
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return res.sendStatus(500);

      return res
        .status(403)
        .send(
          `Image format not supported. Only ${COMPATIBLE_FORMATS.map(
            (format) => `${format} `
          )} are supported`
        );
    });
  }
});

router.get("/download/:size", (req, res) => {
  const { query, params } = req;
  const { imageExt: imageExtension, uid } = query;
  const size = params.size;

  const downloadPath = getResizedImagePath({
    imageExtension,
    size,
    outputDirectory: resizedDirectory,
    uid,
  });

  res.download(downloadPath, (err) => {
    if (err) console.error(err);
  });
});

module.exports = router;
