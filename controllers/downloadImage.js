const path = require("path");

const { getResizedImagePath } = require("../helpers/resizeImage");

const resizedDirectory = path.join(__dirname, `../resized`);

const downloadImage = (req, res) => {
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
    if (err) {
      console.error(err);
      if (err.code === "ENOENT")
        return res
          .status(403)
          .send(
            "Images were removed because time for downloading passed. Please try again."
          );
      return res
        .status(500)
        .send("Error occured while trying to download file");
    }
  });
};

module.exports = { downloadImage };
