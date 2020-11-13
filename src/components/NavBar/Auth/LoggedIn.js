import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Image, Nav, NavDropdown } from "react-bootstrap";
import NotificationItemPopUp from "../../UI/Notification/NotificationItemPopUp";
import NotifIcon from "../Notification/Icon/NotifIcon";

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
                <a css={navItem} href="#action/3.1">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/50" />
                </a>
                <a css={navItem} href="#action/3.2">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/80" />
                </a>
                <a css={navItem} href="#action/3.3">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/70" />
                </a>
                <a css={navItem} href="#action/3.4">
                    <NotificationItemPopUp imgSrc="https://picsum.photos/65" />
                </a>
            </NavDropdown>

            <NavDropdown alignRight title={userAvatar}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                    Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}
