import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { uuid } from "uuidv4";

import Message from "./Message";

function FileUpload() {
  const [file, setFile] = useState({});
  const [message, setMessage] = useState({});
  const [numFiles, setNumFiles] = useState(
    "Select between 1-5 slp files for upload and analysis"
  );
  const [ezData, setEzData] = useState("");
  const [finishedUploading, setFinishedUploading] = useState(false);
  const [id] = useState(uuid());

  const fileChange = async (event) => {
    // console.log(event.target.files[0]);
    // Object.values(event.target.files).map((val) => console.log(val));
    setFile(event.target.files);
    setNumFiles(`${event.target.files.length} files selected`);
    // setErr("");
    setMessage({});
  };

  const uploadFiles = async (event) => {
    event.preventDefault();
    if (JSON.stringify(file) === "{}") {
      // setErr("Please select at least 1 file");
      setMessage({
        type: "danger",
        text: "Please select at least 1 file to upload",
      });
      return;
    }
    Object.values(file).map(async (val) => {
      const formData = new FormData();
      formData.append("file", val);
      try {
        //console.log("posting game file");
        await axios({
          method: "post",
          url: `/upload/:${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        if (err.response.status === 500) {
          setMessage({
            type: "danger",
            text: "Problem with the server",
          });
        } else {
          setMessage({
            type: "danger",
            text: err,
          });
        }
      }
      setFinishedUploading(true);
      setMessage({
        type: "success",
        text: "Finished uploading",
      });
    });
  };
  const simpleData = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: "get",
        url: `/analyze/:${id}`,
      });
      setEzData(res.data);
    } catch (error) {
      setMessage({
        type: "danger",
        text: error,
      });
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
            return <p key={index} style={{color: "#26bc46"}}>{val.name}</p>;
          })}
        <br />
        {JSON.stringify(message) !== "{}" && (
          <Message type={message.type} text={message.text} />
        )}
        <div style={{ padding: "5px" }}>
          <button onClick={uploadFiles}>Upload</button>
          {finishedUploading && <button onClick={simpleData}>Analyze</button>}
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{ezData}</p>
      </Form.Group>
    </Form>
  );
}

export default FileUpload;
