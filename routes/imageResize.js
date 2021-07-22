const multer = require("multer");

const express = require("express");
const router = express.Router();

const { downloadImage } = require("../controllers/downloadImage");
const { uploadImage } = require("../controllers/uploadImage");

const upload = multer({
  dest: "./temp",
});

router.post("/upload", upload.single("image"), uploadImage);

router.get("/download/:size", downloadImage);

module.exports = router;
