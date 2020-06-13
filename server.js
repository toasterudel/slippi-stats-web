const express = require("express");
const fileUpload = require("express-fileupload");
let execSync = require("child_process").execSync;
const fs = require("fs");

const app = express();
app.use(fileUpload());

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

app.get("/analyze", async (req, res) => {
  try {
    execSync(
      "cd ./client/public/uploads/; ./slippi-set-stats-macos; node parse.js; rm *.slp;"
    );

    // await exec("rm ./client/public/uploads/*.slp").unref();
    res.json({ msg: "worked" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("server started..."));
