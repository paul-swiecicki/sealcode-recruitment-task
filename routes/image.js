const multer = require("multer");
const { app } = require("../index");

const upload = multer({
  dest: "/temp",
});

app.post("/upload", upload.single("image"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "./uploads/image.png");
  console.log(tempPath);

  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return console.log(err); //todo

      res.status(200).send("image uploaded");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return console.log(err); //todo

      res.status(403).send("only .pngs are allowed");
    });
  }
});
