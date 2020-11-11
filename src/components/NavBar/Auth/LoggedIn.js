import React from "react";
import { Image, Nav, NavDropdown } from "react-bootstrap";
import NotifIcon from "../Notification/Icon/NotifIcon";

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
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown alignRight title={userAvatar}>
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}
