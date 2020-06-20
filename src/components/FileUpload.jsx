import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { uuid } from "uuidv4";

function FileUpload() {
  const [file, setFile] = useState({});
  const [numFiles, setNumFiles] = useState(
    "Select between 1-5 slp files for upload and analysis"
  );
  const [err, setErr] = useState("");
  const [ezData, setEzData] = useState("");
  const id = uuid();

  const fileChange = async (event) => {
    // console.log(event.target.files[0]);
    // Object.values(event.target.files).map((val) => console.log(val));
    setFile(event.target.files);
    setNumFiles(`${event.target.files.length} files selected`);
    setErr("");
  };

  const uploadFiles = async (event) => {
    event.preventDefault();
    if (JSON.stringify(file) === "{}") {
      setErr("Please select at least 1 file");
      console.log("set err");
      return;
    }
    Object.values(file).map(async (val) => {
      const formData = new FormData();
      formData.append("file", val);
      try {
        await axios({
          method: "post",
          url: `/upload/:${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log("Problem with the server");
        } else {
          console.log(err);
        }
      }
    });
    try {
      const res = await axios({
        method: "get",
        url: `/analyze/:${id}`,
      });

      console.log(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Problem with the server");
      } else {
        console.log(err);
      }
    }
  };
  const simpleData = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: "get",
        url: `/simple/:${id}`,
      });
      setEzData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form>
      <Form.Group>
        <Form.File
          id="slpfile"
          accept=".slp"
          multiple={true}
          onChange={fileChange}
          className="slpform"
        />
        <Form.Text id="slpFileHelp" muted>
          {numFiles}
        </Form.Text>
        {file &&
          Object.values(file).map((val, index) => {
            return <p key={index}>{val.name}</p>;
          })}
        <br />
        <button onClick={uploadFiles}>Analyze</button>
        <button onClick={simpleData}>Simple Output</button>
        <p style={{ color: "red" }}>{err}</p>
        <p>{ezData}</p>
      </Form.Group>
    </Form>
  );
}

export default FileUpload;
