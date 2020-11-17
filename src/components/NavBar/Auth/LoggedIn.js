import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Image, Nav, NavDropdown } from "react-bootstrap";
import NotificationItemPopUp from "../../UI/Notification/NotificationItemPopUp";
import NotifIcon from "../Notification/Icon/NotifIcon";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singOutUser } from "../../../store/reducers/userReducer";

const navItem = css`
    border-left: 5px solid transparent;
    padding: 0;
    display: block;
    color: #000;
    width: 350px;
    &:hover {
        border-left: 5px solid #e01921;
        background: none;
        text-decoration: none;
        color: #000;
    }
`;

export default function LoggedIn() {
    const dispatch = useDispatch();
    const userAvatar = (
        <Image
            style={{ width: "1.5em", height: "1.5em" }}
            className="border"
            roundedCircle
            src="https://picsum.photos/50"
        />
    );

    return (
        <Nav>
            <NavDropdown alignRight title={<NotifIcon />}>
                <Link css={navItem} to="#action/3.1">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/50" />
                </Link>
                <Link css={navItem} to="#action/3.2">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/80" />
                </Link>
                <Link css={navItem} to="#action/3.3">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/70" />
                </Link>
                <Link css={navItem} to="#action/3.4">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/65" />
                </Link>
            </NavDropdown>

            <NavDropdown alignRight title={userAvatar}>
                <NavDropdown.Item as={Link} to="/profile">
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.3">
                    Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                    as={Button}
                    className="btn-dark"
                    onClick={() => dispatch(singOutUser())}
                >
                    Log out
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}
