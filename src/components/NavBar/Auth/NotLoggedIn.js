import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
    return (
        <Nav>
            <Nav.Link
                as={Link}
                className="btn btn-link mr-2 shadow-none"
                to="/signup"
            >
                Sign up
            </Nav.Link>
            <Link className="btn btn-danger" to="/login">
                Login
            </Link>
        </Nav>
    );
}
