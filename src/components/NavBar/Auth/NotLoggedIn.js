import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <Nav>
      <Link className="btn btn-link shadow-none" to="/signup">
        Sign up
      </Link>
      <Link className="btn btn-danger" to="/login">
        Login
      </Link>
    </Nav>
  );
}
