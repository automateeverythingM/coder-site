import React from "react";
import { Nav } from "react-bootstrap";

export default function NotLoggedIn() {
  return (
    <Nav>
      <a className="btn btn-link shadow-none" href="#signup">
        Sign up
      </a>
      <Nav.Link className="btn btn-danger" href="#login">
        Login
      </Nav.Link>
    </Nav>
  );
}
