import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoggedIn from "./Auth/LoggedIn";
import NotLoggedIn from "./Auth/NotLoggedIn";

function NavbarApp({ isUserAuthenticated }) {
    const userAuth = isUserAuthenticated ? <LoggedIn /> : <NotLoggedIn />;
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    CodeBuddy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto md-m-0">
                        {isUserAuthenticated && (
                            <Nav.Link as={Link} to="/profile">
                                Profile
                            </Nav.Link>
                        )}
                    </Nav>
                    {userAuth}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const state = ({ userReducer }) => {
    return {
        isUserAuthenticated: !!userReducer.currentUser,
    };
};

export default connect(state)(NavbarApp);
