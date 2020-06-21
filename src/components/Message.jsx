import React from "react";
import Alert from "react-bootstrap/Alert";

function Message({ type, text }) {
  return <Alert variant={type}>{text}</Alert>;
}

export default Message;
