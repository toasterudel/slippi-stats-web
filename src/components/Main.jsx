import React from "react";
import FileUpload from "./FileUpload";
import Header from "./Header";

function Main() {
  return (
    <>
      <Header />
      <div className="app">
        <p>
          Select the <span style={{ color: "#26bc46" }}>slp</span> files you
          would like analyzed and upload them.
        </p>
        <FileUpload />
      </div>
    </>
  );
}

export default Main;
