const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", (req, res) => {
  return res.send("pong");
});
//upload enpoint
app.post("/upload", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded." });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000);
