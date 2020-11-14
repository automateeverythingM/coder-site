import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoggedIn from "./Auth/LoggedIn";
import NotLoggedIn from "./Auth/NotLoggedIn";

export default function NavbarApp({ isLoggedIn = false }) {
    const userAuth = isLoggedIn ? <LoggedIn /> : <NotLoggedIn />;

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">CodeBuddy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto md-m-0">
                        <Nav.Link as={Link} to="#explore">
                            Explore
                        </Nav.Link>
                        <Nav.Link as={Link} to="#pricing"></Nav.Link>
                        <NavDropdown
                            title="Dropdown"
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {userAuth}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
