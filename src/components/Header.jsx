import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import slp from "../slp.png";

function Header() {
  return (
    <Navbar className="color-nav" fixed="top" sticky="top" variant="dark">
      <Navbar.Brand id="nav">
        <img src={slp} id="slp" alt="slp" /> Slippi Stats
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link
          href="https://slippi.gg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project Slippi
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
