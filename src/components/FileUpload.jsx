import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState({});
  const [numFiles, setNumFiles] = useState(
    "Select between 1-5 slp files for upload and analysis"
  );

  const fileChange = async (event) => {
    // console.log(event.target.files[0]);
    // Object.values(event.target.files).map((val) => console.log(val));
    setFile(event.target.files);
    setNumFiles(`${event.target.files.length} files selected`);
  };

  const uploadFiles = async (event) => {
    event.preventDefault();
    Object.values(file).map(async (val) => {
      const formData = new FormData();
      formData.append("file", val);
      try {
        await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        if (err.response.status === 500) {
          console.log("Problem with the server");
        } else {
          console.log(err.response.data.msg);
        }
      }
    });
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
      </Form.Group>
    </Form>
  );
}

export default FileUpload;
