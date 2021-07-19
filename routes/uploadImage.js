const fs = require("fs");
const multer = require("multer");
const path = require("path");
// const queryString = require("query-string");

const express = require("express");
const router = express.Router();

const { resizeImage, getResizedImagePath } = require("../helpers/resizeImage");
const { IMAGE_RESIZE_SIZES } = require("../constants/constants");

const upload = multer({
  dest: "./temp",
});

const getSizeLinks = (sizes, imageExtension) => {
  const query = `imageExtension=${imageExtension}`;
  return sizes.reduce(
    (acc, size) =>
      `${acc}<a href='/download/${size}?${query}'>pobierz</a> wersję ${size}px szerokości<br>`,
    "" // use empty string as inital value
  );
};

const resizedDirectory = path.join(__dirname, `../resized`);

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(403).send("Musisz wybrać zdjęcia aby przejść dalej!");

  const imageExtension = path.extname(req.file.originalname).toLowerCase();
  const tempPath = req.file.path;

  const targetPath = path.join(__dirname, `../uploads/image${imageExtension}`);

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    resizeImage({
      inputPath: targetPath,
      outputDirectory: resizedDirectory,
      imageExtension,
      sizes: IMAGE_RESIZE_SIZES,
    })
      .then(() => {
        res.status(200).send(getSizeLinks(IMAGE_RESIZE_SIZES, imageExtension));
      })
      .catch((err) => {
        console.error(err);
        res.status(403).send(err.message);
      });
  });
});

router.get("/download/:size", (req, res) => {
  const size = req.params.size;
  const imageExtension = req.query.imageExtension;
  const downloadPath = getResizedImagePath({
    imageExtension,
    size,
    outputDirectory: resizedDirectory,
  });
  res.download(downloadPath);
});

module.exports = router;
