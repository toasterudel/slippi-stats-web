import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState([]);

  const fileChange = async (event) => {
    //console.log(event.target.files.length);
    setFile(event.target.files);
  };

  const uploadFiles = async () => {
    let formData = new FormData();
    formData.append("myFile", file, file.name);
    console.log(file);
    axios.post("api/uploadfile", formData);
  };
  return (
    <Form>
      <Form.Group>
        <Form.File
          id="slpfile"
          accept=".slp"
          multiple={true}
          onChange={fileChange}
        />
        <button onClick={uploadFiles}>Upload</button>
        <Form.Text id="slpFileHelp" muted>
          Select between 1-5 slp files for upload
        </Form.Text>
        {file.length > 0 &&
          Object.values(file).map((val, index) => {
            return <p key={index}>File name: {val.name}</p>;
          })}
      </Form.Group>
    </Form>
  );
}

export default FileUpload;
