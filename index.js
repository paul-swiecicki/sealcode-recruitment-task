const path = require("path");

const express = require("express");
const app = express();

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const uploadImage = require("./routes/uploadImage");

const fileStoreOptions = {};

app.use("/", uploadImage);

app.get("/", express.static(path.join(__dirname, "./views")));

app.use(express.static(path.join(__dirname + "/public")));

app.listen(3003, () => {
  console.log("listening");
});

module.exports = { app };
