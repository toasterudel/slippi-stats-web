import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState({});

  const fileChange = async (event) => {
    // console.log(event.target.files[0]);
    // Object.values(event.target.files).map((val) => console.log(val));
    setFile(event.target.files);
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

    // const formData = new FormData();
    // formData.append("file", file);
    // console.log(formData);
    // try {
    //   const res = await axios.post("/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   const { fileName, filePath } = res.data;
    //   setUploadedFile({ fileName, filePath });
    // } catch (err) {
    //   if (err.response.status === 500) {
    //     console.log("Problem with the server");
    //   } else {
    //     console.log(err.response.data.msg);
    //   }
    // }
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
        {file &&
          Object.values(file).map((val, index) => {
            return <p key={index}>{val.name}</p>;
          })}
      </Form.Group>
    </Form>
  );
}

export default FileUpload;
