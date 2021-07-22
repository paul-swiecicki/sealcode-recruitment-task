const path = require("path");

const express = require("express");
const app = express();

const uploadImage = require("./routes/imageResize");
const { ensureExists } = require("./helpers/ensureExists");

const handleEnsureExistsError = (err) => {
  if (err) console.error(err);
};
const resizedDir = path.join(__dirname, "/resized");
const uploadsDir = path.join(__dirname, "/uploads");
ensureExists(resizedDir, handleEnsureExistsError);
ensureExists(uploadsDir, handleEnsureExistsError);

app.use("/", uploadImage);

app.get("/", express.static(path.join(__dirname, "./views")));

app.use(express.static(path.join(__dirname + "/public")));

app.listen(3003, () => {
  console.log("listening");
});

module.exports = { app };
