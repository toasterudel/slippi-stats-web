const express = require("express");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
const exec = require("child_process").execSync;
const fs = require("fs");

app.use(express.static(path.join(__dirname, "build")));
app.use(fileUpload());

//upload enpoint
app.post("/upload/:id", async (req, res) => {
  if (req.files === null || req.files === undefined) {
    return res.status(400).json({ msg: "No file uploaded." });
  }
  const file = req.files.file;
  const id = req.params.id.substr(1);
  const dir = `${__dirname}/public/uploads/${id}/`;
  if (!fs.existsSync(dir)) {
    // checks to see if directory has already been made
    fs.mkdirSync(dir);
  }
  file.mv(`${dir}/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// analysis endpoint
app.get("/analyze/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ msg: "No ID provided" });
  }
  const id = req.params.id.substr(1);
  const dir = `${__dirname}/public/uploads/${id}/`;
  try {
    exec(
      `cd ${dir}; ../slippi-set-stats-macos .; cp ../parse.js .; node parse.js; rm *.slp parse.js;`
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
  console.log("made it");
  res.sendFile(`${dir}/simpleOutput.txt`);
});

app.get("/simple/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ msg: "No ID provided" });
  }
  const id = req.params.id.substr(1);
  const dir = `${__dirname}/public/uploads/${id}/`;
  if (fs.existsSync(`${dir}/simpleOutput.txt`)) {
    res.sendFile(`${dir}/simpleOutput.txt`);
  } else {
    res.status(500).send({ err: "Was not created" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000);
